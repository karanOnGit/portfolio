import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import BlogFormModal from './BlogFormModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import {
    getCachedDetail,
    setCachedDetail,
    patchCachedDetail,
    removeCachedItem,
    invalidateCache,
} from '../utils/blogCache';
import '../styles/blogs.css';
import '../styles/blog-form.css';

const API_BASE = 'https://api.carsnbike.com/api/blog';

function Toast({ message, type, onDone }) {
    useEffect(() => {
        const t = setTimeout(onDone, 3000);
        return () => clearTimeout(t);
    }, [onDone]);
    return <div className={`blog-toast blog-toast--${type}`}>{message}</div>;
}

export default function BlogDetailPage() {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [blog, setBlog]           = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [fromCache, setFromCache] = useState(false);
    const [error, setError]         = useState(null);

    // Modals
    const [formOpen, setFormOpen]           = useState(false);
    const [deleteOpen, setDeleteOpen]       = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // Toast
    const [toast, setToast] = useState(null);
    const showToast = useCallback((message, type = 'success') => setToast({ message, type }), []);

    // ── Fetch blog (with sessionStorage cache) ──────
    const fetchBlog = useCallback((forceRefresh = false) => {
        // Serve from cache if available and not forcing refresh
        if (!forceRefresh) {
            const cached = getCachedDetail(slug);
            if (cached) {
                setBlog(cached);
                setFromCache(true);
                setIsLoading(false);
                return;
            }
        }

        setIsLoading(true);
        setFromCache(false);
        setError(null);
        fetch(`${API_BASE}/${slug}`)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(data => {
                const b = data.blog || data.data || data;
                setCachedDetail(slug, b);   // persist to sessionStorage
                setBlog(b);
                setFromCache(false);
            })
            .catch(err => setError(err.message))
            .finally(() => setIsLoading(false));
    }, [slug]);

    useEffect(() => { fetchBlog(); }, [fetchBlog]);

    // ── Handlers ─────────────────────────────────
    const handleEditSuccess = (saved) => {
        showToast('✅ Blog updated successfully!');
        // Patch cache entry + force fresh detail fetch
        patchCachedDetail(slug, saved);
        fetchBlog(true);
    };

    const handleDeleteConfirm = async () => {
        if (!blog?.id) return;
        setDeleteLoading(true);
        try {
            const res = await fetch(`${API_BASE}/${blog.id}`, { method: 'DELETE' });
            if (!res.ok) {
                const json = await res.json().catch(() => ({}));
                throw new Error(json.message || `HTTP ${res.status}`);
            }
            // Remove from cache and list cache
            removeCachedItem(blog.id, slug);
            invalidateCache(slug);
            showToast('🗑️ Blog deleted!');
            setTimeout(() => navigate('/blog'), 1500);
        } catch (err) {
            showToast(`⚠ Delete failed: ${err.message}`, 'error');
        } finally {
            setDeleteLoading(false);
            setDeleteOpen(false);
        }
    };

    return (
        <div className="blog-detail-page">
            {/* Top bar: back + CRUD actions */}
            <div className="blog-detail-topbar">
                <button className="blog-back-btn" onClick={() => navigate('/blog')}>
                    ← All Blogs
                </button>

                {/* Show actions only once blog is loaded */}
                {!isLoading && !error && blog && (
                    <div className="blog-detail-crud">
                        <button
                            className="bfm-btn bfm-btn--edit"
                            onClick={() => setFormOpen(true)}
                        >
                            ✏️ Edit
                        </button>
                        <button
                            className="bfm-btn bfm-btn--danger"
                            onClick={() => setDeleteOpen(true)}
                        >
                            🗑️ Delete
                        </button>
                    </div>
                )}
            </div>

            {/* Loading */}
            {isLoading && (
                <div className="blogs-center">
                    <div className="blogs-spinner"></div>
                </div>
            )}

            {/* Error */}
            {!isLoading && error && (
                <div className="blogs-error">
                    <p>⚠ Failed to load blog: {error}</p>
                    <Link to="/blog" className="blog-link">← Go back to blogs</Link>
                </div>
            )}

            {/* ── Blog Content ──────────────────────────── */}
            {!isLoading && !error && blog && (
                <article className="blog-article">

                    {/* Hero Image */}
                    {blog.blog_image && (
                        <div className="blog-detail-hero">
                            <img
                                src={blog.blog_image}
                                alt={blog.title}
                                className="blog-detail-img"
                                onError={e => { e.target.style.display = 'none'; }}
                            />
                            <div className="blog-detail-hero-overlay" />
                        </div>
                    )}

                    <div className="blog-detail-content">
                        {/* Badges row */}
                        <div className="blog-detail-badges">
                            {blog.category && (
                                <span className="blog-chip blog-chip--inline">{blog.category}</span>
                            )}
                            {blog.pinned && (
                                <span className="blog-pinned-badge blog-pinned-badge--inline">📌 Pinned</span>
                            )}
                            {blog.status && (
                                <span className={`blog-status-badge ${blog.status}`}>{blog.status}</span>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className="blog-detail-title text-glow">
                            {blog.title || 'Untitled Blog'}
                        </h1>

                        {/* Meta row */}
                        <div className="blog-detail-meta">
                            <span>👤 {blog.author || 'Anonymous'}</span>
                            {blog.created_at && (
                                <span>
                                    📅 {new Date(blog.created_at).toLocaleDateString('en-US', {
                                        month: 'long', day: 'numeric', year: 'numeric',
                                    })}
                                </span>
                            )}
                            {blog.updated_at && blog.updated_at !== blog.created_at && (
                                <span style={{ opacity: 0.5 }}>
                                    Updated: {new Date(blog.updated_at).toLocaleDateString('en-US', {
                                        month: 'short', day: 'numeric', year: 'numeric',
                                    })}
                                </span>
                            )}
                            <span className="blog-detail-slug">/{blog.slug}</span>
                        </div>

                        {/* Excerpt */}
                        {blog.short_description && (
                            <p className="blog-detail-excerpt">{blog.short_description}</p>
                        )}

                        {/* Tags */}
                        {Array.isArray(blog.tags) && blog.tags.length > 0 && (
                            <div className="blog-tags blog-tags--detail">
                                {blog.tags.map((tag, i) => (
                                    <span key={i} className="blog-tag">{tag}</span>
                                ))}
                            </div>
                        )}

                        {/* Rich HTML body — body_text per schema */}
                        {blog.body_text ? (
                            <div
                                className="blog-detail-body"
                                dangerouslySetInnerHTML={{ __html: blog.body_text }}
                            />
                        ) : blog.detail_description ? (
                            <div
                                className="blog-detail-body"
                                dangerouslySetInnerHTML={{ __html: blog.detail_description }}
                            />
                        ) : (
                            <p className="blog-detail-body" style={{ opacity: 0.5 }}>
                                No content available for this blog.
                            </p>
                        )}

                        {/* Meta Keywords */}
                        {Array.isArray(blog.meta_keyword) && blog.meta_keyword.length > 0 && (
                            <div className="blog-meta-keywords">
                                <span className="blog-meta-keywords__label">Keywords:</span>
                                {blog.meta_keyword.map((kw, i) => (
                                    <span key={i} className="blog-tag blog-tag--keyword">{kw}</span>
                                ))}
                            </div>
                        )}

                        {/* Footer actions */}
                        <div className="blog-detail-actions">
                            <a
                                href={`https://carsnbike.com/blog-single/${blog.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="blog-external-link"
                            >
                                View on CarsNBike ↗
                            </a>
                            <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'center' }}>
                                <button className="bfm-btn bfm-btn--edit" onClick={() => setFormOpen(true)}>
                                    ✏️ Edit Blog
                                </button>
                                <button className="bfm-btn bfm-btn--danger" onClick={() => setDeleteOpen(true)}>
                                    🗑️ Delete
                                </button>
                                <Link to="/blog" className="blog-back-to-list">← All blogs</Link>
                            </div>
                        </div>
                    </div>
                </article>
            )}

            {/* ── Modals ─────────────────────────────────── */}
            <BlogFormModal
                open={formOpen}
                onClose={() => setFormOpen(false)}
                blog={blog}
                onSuccess={handleEditSuccess}
            />

            <DeleteConfirmModal
                open={deleteOpen}
                onClose={() => setDeleteOpen(false)}
                onConfirm={handleDeleteConfirm}
                title={blog?.title}
                loading={deleteLoading}
            />

            {/* ── Toast ───────────────────────────────────── */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onDone={() => setToast(null)}
                />
            )}
        </div>
    );
}
