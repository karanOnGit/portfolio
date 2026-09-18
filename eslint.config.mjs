import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) })

const config = [
  ...compat.extends('next/core-web-vitals'),
  {
    ignores: ['.next/**', '.next-*/**', 'node_modules/**', 'public/**'],
  },
  {
    rules: {
      // The journal renders sanitised HTML from an upstream CMS; the sanitiser
      // runs server-side in lib/sanitize.js before any markup reaches a page.
      'react/no-danger': 'off',
    },
  },
]

export default config
