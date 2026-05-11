import { useState, useEffect } from 'react';
import '../styles/blog-form.css';

const API_BASE   = 'https://api.carsnbike.com/api/blog';
const GROQ_API   = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_KEY   = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_MODEL = 'llama-3.3-70b-versatile';

const CATEGORIES   = ['News', 'Reviews', 'Tips & Tricks', 'Technology', 'Events', 'Comparisons', 'Guides'];
const STATUSES     = ['published', 'draft'];
const VISIBILITIES = ['public', 'private'];

const generateSlug = (text) =>
    text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const EMPTY_FORM = {
    title:             '',
    slug:              '',
    meta_title:        '',
    meta_description:  '',
    meta_keyword:      '',
    tags:              '',
    short_description: '',
    author:            '',
    category:          '',
    blog_image:        '',
    body_text:         '',
    status:            'published',
    visibility:        'public',
    pinned:            false,
    slugEdited:        false,
};

// ── Groq prompt ──────────────────────────────────────────────────────────────
const buildPrompt = (title) => `
You are an expert automotive and technology blog writer for CarsNBike.com — India's leading automotive news portal.

Generate a complete, SEO-optimised blog post for the following title:
"${title}"

Return ONLY a valid JSON object (no markdown, no explanation) with exactly these fields:

{
  "title": "<the exact title provided>",
  "slug": "<URL-friendly slug derived from title>",
  "author": "CarsNBike Editorial Team",
  "category": "<one of: News, Reviews, Tips & Tricks, Technology, Events, Comparisons, Guides>",
  "meta_title": "<SEO title, max 60 chars>",
  "meta_description": "<compelling meta description, 130-155 chars>",
  "meta_keyword": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5", "keyword6", "keyword7", "keyword8"],
  "tags": ["#Tag1", "#Tag2", "#Tag3", "#Tag4", "#Tag5"],
  "short_description": "<2-3 sentence engaging excerpt shown on blog cards, 150-220 chars>",
  "body_text": "<full rich HTML article, minimum 1200 words, use h2/h3/p/ul/ol/strong/blockquote tags, well-structured with intro, multiple sections, conclusion — no inline styles>"
}

Rules:
- body_text must be rich, detailed, informative HTML — minimum 1200 words
- meta_keyword is an array of strings (no # prefix)
- tags is an array of strings (with # prefix)
- All content must be relevant to Indian automotive market and CarsNBike audience
- Return ONLY the raw JSON — no code fences, no extra text
`.trim();

// ── Parse Groq response safely ────────────────────────────────────────────────
function parseGroqJSON(text) {
    // Strip potential markdown code fences
    const cleaned = text.replace(/^```[a-z]*\n?/i, '').replace(/\n?```$/i, '').trim();
    return JSON.parse(cleaned);
}

// ─────────────────────────────────────────────────────────────────────────────

export default function BlogFormModal({ open, onClose, blog, onSuccess }) {
    const isEdit = Boolean(blog?.id);
    const [form, setForm]               = useState(EMPTY_FORM);
    const [loading, setLoading]         = useState(false);
    const [generating, setGenerating]   = useState(false);
    const [genProgress, setGenProgress] = useState('');
    const [error, setError]             = useState(null);
    const [previewImage, setPreviewImage] = useState('');

    // Populate form when editing
    useEffect(() => {
        if (!open) return;
        if (blog) {
            setForm({
                title:             blog.title             ?? '',
                slug:              blog.slug              ?? '',
                meta_title:        blog.meta_title        ?? '',
                meta_description:  blog.meta_description  ?? '',
                meta_keyword:      (blog.meta_keyword ?? []).join(', '),
                tags:              (blog.tags ?? []).join(', '),
                short_description: blog.short_description ?? '',
                author:            blog.author            ?? '',
                category:          blog.category          ?? '',
                blog_image:        blog.blog_image         ?? '',
                body_text:         blog.body_text ?? blog.detail_description ?? '',
                status:            blog.status             ?? 'published',
                visibility:        blog.visibility         ?? 'public',
                pinned:            blog.pinned             ?? false,
                slugEdited: true,
            });
            setPreviewImage(blog.blog_image ?? '');
        } else {
            setForm(EMPTY_FORM);
            setPreviewImage('');
        }
        setError(null);
        setGenProgress('');
    }, [blog, open]);

    const set = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

    const handleTitleChange = (value) => {
        setForm(prev => ({
            ...prev,
            title: value,
            slug: prev.slugEdited ? prev.slug : generateSlug(value),
        }));
    };

    // ── AI Generate ──────────────────────────────────────────────────────────
    const handleAIGenerate = async () => {
        const title = form.title.trim();
        if (!title) {
            setError('Please enter a blog title first, then click AI Generate.');
            return;
        }
        setGenerating(true);
        setError(null);
        setGenProgress('🤖 Connecting to Groq AI…');

        try {
            setGenProgress('✍️ Generating blog content (this may take 10–20s)…');

            const res = await fetch(GROQ_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${GROQ_KEY}`,
                },
                body: JSON.stringify({
                    model: GROQ_MODEL,
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a professional blog writer and SEO expert. You always respond with valid JSON only — no markdown, no code fences, no extra commentary.',
                        },
                        {
                            role: 'user',
                            content: buildPrompt(title),
                        },
                    ],
                    temperature: 0.7,
                    max_tokens: 4096,
                }),
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error?.message || `Groq API error: HTTP ${res.status}`);
            }

            const data    = await res.json();
            const rawText = data.choices?.[0]?.message?.content ?? '';

            setGenProgress('🧩 Parsing generated content…');

            const generated = parseGroqJSON(rawText);

            // Fill all fields except blog_image (keep existing image if set)
            setForm(prev => ({
                ...prev,
                title:             generated.title             || prev.title,
                slug:              generated.slug              || generateSlug(generated.title || prev.title),
                author:            generated.author            || prev.author,
                category:          CATEGORIES.includes(generated.category) ? generated.category : prev.category,
                meta_title:        generated.meta_title        || '',
                meta_description:  generated.meta_description  || '',
                meta_keyword:      Array.isArray(generated.meta_keyword)
                                       ? generated.meta_keyword.join(', ')
                                       : (generated.meta_keyword || ''),
                tags:              Array.isArray(generated.tags)
                                       ? generated.tags.join(', ')
                                       : (generated.tags || ''),
                short_description: generated.short_description || '',
                body_text:         generated.body_text         || '',
                slugEdited: true,
            }));

            setGenProgress('✅ Blog generated! Review & add an image, then publish.');
        } catch (err) {
            setError(`AI Generation failed: ${err.message}`);
            setGenProgress('');
        } finally {
            setGenerating(false);
        }
    };

    // ── Submit ────────────────────────────────────────────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const payload = {
            title:              form.title,
            slug:               form.slug,
            meta_title:         form.meta_title,
            meta_description:   form.meta_description,
            meta_keyword:       form.meta_keyword.split(',').map(s => s.trim()).filter(Boolean),
            tags:               form.tags.split(',').map(s => s.trim()).filter(Boolean),
            short_description:  form.short_description,
            author:             form.author,
            category:           form.category || undefined,
            blog_image:         form.blog_image,
            body_text:          form.body_text,
            detail_description: form.body_text,
            status:             form.status,
            visibility:         form.visibility,
            pinned:             form.pinned,
        };

        try {
            const url    = isEdit ? `${API_BASE}/${blog.id}` : `${API_BASE}/`;
            const method = isEdit ? 'PUT' : 'POST';

            const res  = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.message || json.detail || 'Failed to save');

            onSuccess(json.blog || json.data || json);
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <div className="bfm-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="bfm-modal">

                {/* ── Header ──────────────────────────────────────── */}
                <div className="bfm-header">
                    <h2 className="bfm-title">{isEdit ? '✏️ Edit Blog' : '✨ Create New Blog'}</h2>
                    <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                        {/* AI Generate button */}
                        <button
                            type="button"
                            className={`bfm-btn bfm-btn--ai${generating ? ' bfm-btn--ai-loading' : ''}`}
                            onClick={handleAIGenerate}
                            disabled={generating || loading}
                            title="Auto-fill all fields using Groq AI based on the title"
                        >
                            {generating
                                ? <><span className="bfm-btn-spinner bfm-btn-spinner--ai" /> Generating…</>
                                : '🤖 AI Generate'}
                        </button>
                        <button className="bfm-close" onClick={onClose} title="Close">✕</button>
                    </div>
                </div>

                {/* ── AI Progress Banner ───────────────────────────── */}
                {genProgress && !error && (
                    <div className={`bfm-gen-progress${genProgress.startsWith('✅') ? ' bfm-gen-progress--done' : ''}`}>
                        {genProgress}
                    </div>
                )}

                {/* ── Error Banner ─────────────────────────────────── */}
                {error && <div className="bfm-error">⚠ {error}</div>}

                {/* ── Image preview ────────────────────────────────── */}
                {previewImage && (
                    <div className="bfm-img-preview">
                        <img src={previewImage} alt="Preview" onError={e => e.target.style.display = 'none'} />
                    </div>
                )}

                <form className="bfm-form" onSubmit={handleSubmit}>
                    <div className="bfm-scroll">

                        {/* ── Title + Slug ─────────────────────────── */}
                        <div className="bfm-row bfm-row--2">
                            <div className="bfm-field">
                                <label className="bfm-label">
                                    Title *
                                    <span className="bfm-hint"> — enter title then click 🤖 AI Generate</span>
                                </label>
                                <input
                                    className={`bfm-input${generating ? ' bfm-input--generating' : ''}`}
                                    value={form.title}
                                    onChange={e => handleTitleChange(e.target.value)}
                                    placeholder="e.g. Top 5 Electric SUVs in India 2026"
                                    required
                                    disabled={generating}
                                />
                            </div>
                            <div className="bfm-field">
                                <label className="bfm-label">Slug *</label>
                                <input
                                    className="bfm-input bfm-input--mono"
                                    value={form.slug}
                                    onChange={e => { set('slug', generateSlug(e.target.value)); set('slugEdited', true); }}
                                    placeholder="auto-generated-from-title"
                                    required
                                    disabled={generating}
                                />
                            </div>
                        </div>

                        {/* ── Author + Category ────────────────────── */}
                        <div className="bfm-row bfm-row--2">
                            <div className="bfm-field">
                                <label className="bfm-label">Author *</label>
                                <input
                                    className="bfm-input"
                                    value={form.author}
                                    onChange={e => set('author', e.target.value)}
                                    placeholder="Author name"
                                    required
                                    disabled={generating}
                                />
                            </div>
                            <div className="bfm-field">
                                <label className="bfm-label">Category</label>
                                <select
                                    className="bfm-select"
                                    value={form.category}
                                    onChange={e => set('category', e.target.value)}
                                    disabled={generating}
                                >
                                    <option value="">— Select —</option>
                                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* ── Blog Image URL ───────────────────────── */}
                        <div className="bfm-field">
                            <label className="bfm-label">
                                Blog Image URL *
                                <span className="bfm-hint"> — not auto-generated, add manually</span>
                            </label>
                            <input
                                className="bfm-input"
                                type="url"
                                value={form.blog_image}
                                onChange={e => { set('blog_image', e.target.value); setPreviewImage(e.target.value); }}
                                placeholder="https://..."
                                required
                            />
                        </div>

                        {/* ── Short Description ────────────────────── */}
                        <div className="bfm-field">
                            <label className="bfm-label">Short Description *</label>
                            <textarea
                                className="bfm-textarea"
                                rows={3}
                                value={form.short_description}
                                onChange={e => set('short_description', e.target.value)}
                                placeholder="Brief excerpt shown on blog cards…"
                                required
                                disabled={generating}
                            />
                        </div>

                        {/* ── Status + Visibility + Pinned ─────────── */}
                        <div className="bfm-row bfm-row--3">
                            <div className="bfm-field">
                                <label className="bfm-label">Status</label>
                                <select className="bfm-select" value={form.status} onChange={e => set('status', e.target.value)}>
                                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div className="bfm-field">
                                <label className="bfm-label">Visibility</label>
                                <select className="bfm-select" value={form.visibility} onChange={e => set('visibility', e.target.value)}>
                                    {VISIBILITIES.map(v => <option key={v} value={v}>{v}</option>)}
                                </select>
                            </div>
                            <div className="bfm-field bfm-field--toggle">
                                <label className="bfm-label">Pinned</label>
                                <button
                                    type="button"
                                    className={`bfm-toggle${form.pinned ? ' bfm-toggle--on' : ''}`}
                                    onClick={() => set('pinned', !form.pinned)}
                                >
                                    <span className="bfm-toggle__thumb" />
                                </button>
                                <span className="bfm-toggle__label">{form.pinned ? '📌 Yes' : 'No'}</span>
                            </div>
                        </div>

                        {/* ── Tags + Keywords ──────────────────────── */}
                        <div className="bfm-row bfm-row--2">
                            <div className="bfm-field">
                                <label className="bfm-label">Tags <span className="bfm-hint">(comma separated)</span></label>
                                <input
                                    className="bfm-input"
                                    value={form.tags}
                                    onChange={e => set('tags', e.target.value)}
                                    placeholder="#EV, #Technology, #India"
                                    disabled={generating}
                                />
                            </div>
                            <div className="bfm-field">
                                <label className="bfm-label">Meta Keywords <span className="bfm-hint">(comma separated)</span></label>
                                <input
                                    className="bfm-input"
                                    value={form.meta_keyword}
                                    onChange={e => set('meta_keyword', e.target.value)}
                                    placeholder="keyword one, keyword two"
                                    disabled={generating}
                                />
                            </div>
                        </div>

                        {/* ── Meta Title ───────────────────────────── */}
                        <div className="bfm-field">
                            <label className="bfm-label">Meta Title</label>
                            <input
                                className="bfm-input"
                                value={form.meta_title}
                                onChange={e => set('meta_title', e.target.value)}
                                placeholder="SEO title (max 60 chars)"
                                disabled={generating}
                            />
                        </div>

                        {/* ── Meta Description ─────────────────────── */}
                        <div className="bfm-field">
                            <label className="bfm-label">Meta Description</label>
                            <textarea
                                className="bfm-textarea"
                                rows={2}
                                value={form.meta_description}
                                onChange={e => set('meta_description', e.target.value)}
                                placeholder="SEO meta description (130-155 chars)…"
                                disabled={generating}
                            />
                        </div>

                        {/* ── Body Content ─────────────────────────── */}
                        <div className="bfm-field">
                            <label className="bfm-label">
                                Blog Content
                                <span className="bfm-hint"> (HTML — auto-filled by AI Generate)</span>
                            </label>
                            {generating ? (
                                <div className="bfm-body-skeleton">
                                    <div className="bfm-skeleton-line" style={{ width: '80%' }} />
                                    <div className="bfm-skeleton-line" style={{ width: '100%' }} />
                                    <div className="bfm-skeleton-line" style={{ width: '65%' }} />
                                    <div className="bfm-skeleton-line" style={{ width: '90%' }} />
                                    <div className="bfm-skeleton-line" style={{ width: '75%' }} />
                                    <div className="bfm-skeleton-line" style={{ width: '100%' }} />
                                    <div className="bfm-skeleton-line" style={{ width: '55%' }} />
                                </div>
                            ) : (
                                <textarea
                                    className="bfm-textarea bfm-textarea--body"
                                    rows={18}
                                    value={form.body_text}
                                    onChange={e => set('body_text', e.target.value)}
                                    placeholder="<h2>Introduction</h2><p>Write your blog content here. HTML is supported. Or use 🤖 AI Generate above.</p>"
                                    spellCheck={false}
                                />
                            )}
                            <p className="bfm-hint-block">
                                💡 HTML is supported. Use 🤖 AI Generate to auto-fill this from the title.
                            </p>
                        </div>

                    </div>

                    {/* ── Footer ────────────────────────────────────── */}
                    <div className="bfm-footer">
                        <button type="button" className="bfm-btn bfm-btn--ghost" onClick={onClose} disabled={loading || generating}>
                            Cancel
                        </button>
                        <button
                            type="button"
                            className={`bfm-btn bfm-btn--ai${generating ? ' bfm-btn--ai-loading' : ''}`}
                            onClick={handleAIGenerate}
                            disabled={generating || loading}
                        >
                            {generating
                                ? <><span className="bfm-btn-spinner bfm-btn-spinner--ai" /> Generating…</>
                                : '🤖 AI Generate'}
                        </button>
                        <button type="submit" className="bfm-btn bfm-btn--primary" disabled={loading || generating}>
                            {loading
                                ? <span className="bfm-btn-spinner" />
                                : isEdit ? '💾 Update Blog' : '🚀 Publish Blog'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
