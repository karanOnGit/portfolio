import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/guestbook.css';

// TODO: Replace this with your Google Apps Script Web App URL
const API_URL = 'https://script.google.com/macros/s/AKfycbx8VgsTao4Wl_YKAXXJu41lSMDT-aXBaXyPGXo5ZbhMCJuvmVGP8e9U8A6eEYFdvW4u/exec';

export default function GuestbookPage() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState({ type: '', text: '' });
    
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch comments on mount
    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        if (API_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            if (data.status === 'success') {
                setComments(data.data || []);
            }
        } catch (error) {
            console.error('Failed to fetch comments:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!name.trim() || !message.trim()) {
            setStatus({ type: 'error', text: 'Please fill in both fields.' });
            return;
        }

        if (API_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
            setStatus({ type: 'error', text: 'API URL not configured yet. Check implementation_plan.md' });
            return;
        }

        setIsSubmitting(true);
        setStatus({ type: '', text: '' });

        try {
            // Using fetch with no-cors or standard if Apps script handles it well.
            // Google Apps script generally prefers text/plain for POST to avoid CORS preflight
            const response = await fetch(API_URL, {
                method: 'POST',
                // Send as plain text so it doesn't trigger CORS preflightOPTIONS
                body: JSON.stringify({ name, message }),
            });

            const result = await response.json();
            
            if (result.status === 'success') {
                setStatus({ type: 'success', text: 'Thank you for your message!' });
                setName('');
                setMessage('');
                fetchComments(); // Refresh list
            } else {
                throw new Error(result.message || 'Failed to submit');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus({ type: 'error', text: 'Something went wrong. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="guestbook-root">
            <div className="guestbook-bg-gradient" />

            <button className="guestbook-back" onClick={() => navigate(-1)}>
                ← BACK
            </button>

            <div className="guestbook-content">
                <motion.div 
                    className="guestbook-header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="guestbook-title">Guestbook</h1>
                    <p className="guestbook-subtitle">// leave a mark</p>
                </motion.div>

                <motion.div 
                    className="guestbook-form-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <form onSubmit={handleSubmit}>
                        <div className="guestbook-form-group">
                            <label className="guestbook-label">Name / Alias</label>
                            <input 
                                type="text" 
                                className="guestbook-input"
                                placeholder="How should I call you?"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="guestbook-form-group">
                            <label className="guestbook-label">Message</label>
                            <textarea 
                                className="guestbook-textarea"
                                placeholder="Thoughts, feedback, or just say hi..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                disabled={isSubmitting}
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="guestbook-submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'SENDING...' : 'SIGN GUESTBOOK'}
                        </button>
                        
                        <AnimatePresence>
                            {status.text && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className={`guestbook-status ${status.type}`}
                                >
                                    {status.text}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </motion.div>

                <motion.div 
                    className="guestbook-list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h2 className="guestbook-list-title">Recent Signatures</h2>
                    
                    {isLoading ? (
                        <div className="guestbook-loading">Loading messages...</div>
                    ) : comments.length === 0 ? (
                        <div className="guestbook-loading" style={{ opacity: 0.3 }}>
                            No signatures yet. Be the first!
                        </div>
                    ) : (
                        <div className="guestbook-comments">
                            <AnimatePresence>
                                {comments.map((comment, i) => (
                                    <motion.div 
                                        key={i}
                                        className="guestbook-comment-card"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <div className="guestbook-comment-header">
                                            <span className="guestbook-comment-name">{comment.name}</span>
                                            <span className="guestbook-comment-date">{formatDate(comment.timestamp)}</span>
                                        </div>
                                        <div className="guestbook-comment-text">
                                            {comment.message}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
