import fs from 'node:fs'
import path from 'node:path'
import { S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'

const ACCOUNT_ID = process.env.R2_ACCOUNT_ID || 'd6b938492e3b72ec8c83ce9a76420586'
const BUCKET = process.env.R2_BUCKET || 'buckelist'
const ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID
const SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY

if (!ACCESS_KEY_ID || !SECRET_ACCESS_KEY) {
  console.error('\n❌ Missing R2 credentials!')
  console.error('Please set R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY in .env or pass them as environment variables.')
  console.error('To generate them: Cloudflare Dashboard -> R2 -> Manage R2 API Tokens -> Create API Token\n')
  process.exit(1)
}

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
})

const filesToUpload = [
  'public/vid/bkt-lst-01.mp4',
  'public/vid/bkt-lst-02.mp4',
]

async function uploadFile(filePath) {
  const resolved = path.resolve(filePath)
  if (!fs.existsSync(resolved)) {
    console.error(`File not found: ${filePath}`)
    return
  }

  const fileName = path.basename(filePath)
  const fileStream = fs.createReadStream(resolved)
  const totalSize = fs.statSync(resolved).size
  const totalMB = (totalSize / (1024 * 1024)).toFixed(1)

  console.log(`\n🚀 Uploading ${fileName} (${totalMB} MB) to R2 via S3 Multipart API...`)

  const upload = new Upload({
    client: s3,
    params: {
      Bucket: BUCKET,
      Key: fileName,
      Body: fileStream,
      ContentType: 'video/mp4',
    },
    partSize: 15 * 1024 * 1024, // 15MB chunks
    queueSize: 4, // 4 concurrent uploads
  })

  upload.on('httpUploadProgress', (progress) => {
    const loaded = progress.loaded || 0
    const loadedMB = (loaded / (1024 * 1024)).toFixed(1)
    const pct = Math.min(100, Math.round((loaded / totalSize) * 100))
    process.stdout.write(`\r   Progress: ${loadedMB} MB / ${totalMB} MB (${pct}%)`)
  })

  await upload.done()
  console.log(`\n✅ Upload complete: https://media.karanbhardwaj.in/${fileName}`)
}

async function main() {
  for (const file of filesToUpload) {
    await uploadFile(file)
  }
  console.log('\n🎉 All videos uploaded successfully to Cloudflare R2!')
}

main().catch((err) => {
  console.error('\n❌ Upload failed:', err.message)
  process.exit(1)
})
