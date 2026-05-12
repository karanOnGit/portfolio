import { useState, useMemo, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BlogFormModal from './BlogFormModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import {
    getCachedList,
    setCachedList,
    invalidateCache,
    removeCachedItem,
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

export default function BlogsPage() {
    const [blogs, setBlogs]               = useState([]);
    const [allBlogs, setAllBlogs]         = useState([]); // unfiltered store
    const [isLoading, setIsLoading]       = useState(true);
    const [fromCache, setFromCache]       = useState(false);
    const [error, setError]               = useState(null);
    const [searchQuery, setSearchQuery]   = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const navigate = useNavigate();

    // Modal state
    const [formOpen, setFormOpen]             = useState(false);
    const [editingBlog, setEditingBlog]       = useState(null);   // null = create
    const [deleteTarget, setDeleteTarget]     = useState(null);   // blog to delete
    const [deleteLoading, setDeleteLoading]   = useState(false);

    // Toast
    const [toast, setToast] = useState(null); // { message, type }
    const showToast = useCallback((message, type = 'success') => setToast({ message, type }), []);

    // ── Apply fetched/cached array to state ───────────
    const applyBlogs = useCallback((arr, cached = false) => {
        setAllBlogs(arr);
        setBlogs(arr.filter(b => b.status === 'published' && b.visibility === 'public'));
        setFromCache(cached);
    }, []);

    // ── Fetch all blogs (with sessionStorage cache) ───
    const fetchBlogs = useCallback((forceRefresh = false) => {
        // Try cache first (skip if forceRefresh requested after a mutation)
        if (!forceRefresh) {
            const cached = getCachedList();
            if (cached) {
                applyBlogs(cached, true);
                setIsLoading(false);
                return;
            }
        }

        setIsLoading(true);
        setFromCache(false);
        fetch(`${API_BASE}/`)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(data => {
                const arr = Array.isArray(data) ? data : (data.blogs || data.data || []);
                setCachedList(arr);          // persist to sessionStorage
                applyBlogs(arr, false);
            })
            .catch(err => setError(err.message))
            .finally(() => setIsLoading(false));
    }, [applyBlogs]);

    useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

    // ── Derived categories ────────────────────────────
    const categories = useMemo(() => {
        const cats = [...new Set(blogs.map(b => b.category).filter(Boolean))];
        return ['All', ...cats];
    }, [blogs]);

    // ── Filtered list ─────────────────────────────────
    const filteredBlogs = useMemo(() => {
        let result = blogs;
        if (activeCategory !== 'All') result = result.filter(b => b.category === activeCategory);
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(b =>
                (b.title || '').toLowerCase().includes(q) ||
                (b.author || '').toLowerCase().includes(q) ||
                (b.category || '').toLowerCase().includes(q) ||
                (b.slug || '').toLowerCase().includes(q) ||
                (b.short_description || '').toLowerCase().includes(q)
            );
        }
        return result;
    }, [blogs, searchQuery, activeCategory]);

    // ── Handlers ──────────────────────────────────────
    const handleCreate = () => { setEditingBlog(null); setFormOpen(true); };
    const handleEdit   = (e, blog) => { e.preventDefault(); e.stopPropagation(); setEditingBlog(blog); setFormOpen(true); };
    const handleDeleteClick = (e, blog) => { e.preventDefault(); e.stopPropagation(); setDeleteTarget(blog); };

    const handleFormSuccess = (saved) => {
        showToast(editingBlog ? '✅ Blog updated successfully!' : '🚀 Blog published successfully!');
        invalidateCache();           // bust the list + all detail caches
        fetchBlogs(true);            // force fresh API fetch
    };

    const handleDeleteConfirm = async () => {
        if (!deleteTarget) return;
        setDeleteLoading(true);
        try {
            const res = await fetch(`${API_BASE}/${deleteTarget.id}`, { method: 'DELETE' });
            if (!res.ok) {
                const json = await res.json().catch(() => ({}));
                throw new Error(json.message || `HTTP ${res.status}`);
            }
            // Optimistically remove from cache & state without a full refetch
            removeCachedItem(deleteTarget.id, deleteTarget.slug);
            setAllBlogs(prev => prev.filter(b => b.id !== deleteTarget.id));
            setBlogs(prev => prev.filter(b => b.id !== deleteTarget.id));
            showToast('🗑️ Blog deleted successfully!');
            setDeleteTarget(null);
        } catch (err) {
            showToast(`⚠ Delete failed: ${err.message}`, 'error');
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <div className="blogs-page">
            {/* Back nav */}
            <button className="blog-back-btn" onClick={() => navigate('/')}>
                ← Back to Portfolio
            </button>

            {/* Header */}
            <div className="blogs-header">
                <div className="blogs-header-text">
                    <h1 className="blogs-title text-glow">BLOGS</h1>
                    <p className="blogs-subtitle">
                        Insights, articles &amp; technical deep-dives
                        {!isLoading && !error && (
                            <span className="blogs-count"> — {filteredBlogs.length} article{filteredBlogs.length !== 1 ? 's' : ''}</span>
                        )}
                        {!isLoading && fromCache && (
                            <span className="blogs-cache-badge" title="Showing cached data — click to refresh from server">
                                ⚡ cached
                                <button
                                    className="blogs-cache-refresh"
                                    onClick={() => { invalidateCache(); fetchBlogs(true); }}
                                    title="Force refresh from API"
                                >
                                    ↻
                                </button>
                            </span>
                        )}
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <input
                        className="blogs-search"
                        type="text"
                        placeholder="Search blogs..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                    <button className="blogs-create-btn" onClick={handleCreate}>
                        + New Blog
                    </button>
                </div>
            </div>

            {/* Category filter pills */}
            {!isLoading && categories.length > 1 && (
                <div className="blogs-categories">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`category-pill${activeCategory === cat ? ' active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            )}

            {/* Loading */}
            {isLoading && (
                <div className="blogs-center">
                    <div className="blogs-spinner"></div>
                </div>
            )}

            {/* Error */}
            {!isLoading && error && (
                <div className="blogs-error">
                    <p>⚠ Failed to load blogs: {error}</p>
                    <small style={{ opacity: 0.6 }}>API may restrict cross-origin requests from localhost.</small>
                    <br />
                    <button
                        className="bfm-btn bfm-btn--ghost"
                        style={{ marginTop: '1rem' }}
                        onClick={handleCreate}
                    >
                        + Create a Blog Anyway
                    </button>
                </div>
            )}

            {/* Empty state */}
            {!isLoading && !error && filteredBlogs.length === 0 && (
                <div className="blogs-empty">
                    <p>{searchQuery ? `No blogs matching "${searchQuery}"` : 'No blogs available yet.'}</p>
                    <button className="blogs-create-btn" style={{ marginTop: '1.5rem' }} onClick={handleCreate}>
                        + Create First Blog
                    </button>
                </div>
            )}

            {/* Blog Grid */}
            {!isLoading && !error && filteredBlogs.length > 0 && (
                <div className="blogs-grid">
                    {filteredBlogs.map((blog) => (
                        <Link
                            key={blog.id || blog._id || blog.slug}
                            to={`/blog/${blog.slug}`}
                            className={`blog-card${blog.pinned ? ' blog-card--pinned' : ''}`}
                        >
                            <div className="blog-card-image">
                                <img
                                    src={blog.blog_image}
                                    alt={blog.title || 'Blog'}
                                    onError={e => { e.target.src = 'https://placehold.co/600x400/0a0a0a/555?text=No+Image'; }}
                                />
                                {blog.pinned && <span className="blog-pinned-badge">📌 Pinned</span>}
                                {blog.category && <span className="blog-chip">{blog.category}</span>}

                                {/* ── Card Actions (edit / delete) ── */}
                                <div className="blog-card-actions">
                                    <button
                                        className="blog-card-action-btn blog-card-action-btn--edit"
                                        title="Edit blog"
                                        onClick={e => handleEdit(e, blog)}
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        className="blog-card-action-btn blog-card-action-btn--delete"
                                        title="Delete blog"
                                        onClick={e => handleDeleteClick(e, blog)}
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>

                            <div className="blog-card-body">
                                <div className="blog-meta">
                                    <span className="blog-author">👤 {blog.author || 'Anonymous'}</span>
                                    <span className="blog-date">
                                        {blog.created_at
                                            ? new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                            : 'No date'}
                                    </span>
                                </div>

                                <h2 className="blog-card-title">{blog.title || 'Untitled Blog'}</h2>
                                <p className="blog-card-slug">/{blog.slug || 'no-path'}</p>
                                <p className="blog-card-desc">{blog.short_description || 'No description available.'}</p>

                                {Array.isArray(blog.tags) && blog.tags.length > 0 && (
                                    <div className="blog-tags">
                                        {blog.tags.slice(0, 3).map((tag, i) => (
                                            <span key={i} className="blog-tag">{tag}</span>
                                        ))}
                                    </div>
                                )}

                                <span className="blog-read-more">Read Article →</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* ── Modals ─────────────────────────────────── */}
            <BlogFormModal
                open={formOpen}
                onClose={() => setFormOpen(false)}
                blog={editingBlog}
                onSuccess={handleFormSuccess}
            />

            <DeleteConfirmModal
                open={Boolean(deleteTarget)}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDeleteConfirm}
                title={deleteTarget?.title}
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
