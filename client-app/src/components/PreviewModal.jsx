import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Calendar, Tag } from 'lucide-react';

const PreviewModal = ({ bookmark, isOpen, onClose }) => {
    if (!isOpen || !bookmark) return null;

    // Helper to get YouTube Embed URL
    const getEmbedUrl = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}?autoplay=1` : null;
    };

    const embedUrl = getEmbedUrl(bookmark.url);
    const isYoutube = !!embedUrl;

    // Determine match percentage based on bookmark validity
    const matchPercentage = bookmark.isValid ? 98 : 45;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative w-full max-w-4xl bg-slate-900 border-4 border-slate-700 rounded-sm overflow-hidden shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-red-600 rounded-full text-white transition border-2 border-white/20"
                        >
                            <X size={24} />
                        </button>

                        <div className="grid md:grid-cols-[1.5fr_1fr]">
                            {/* Media Section */}
                            <div className="max-h-[60vh] md:max-h-[500px] border-b-4 md:border-b-0 md:border-r-4 border-slate-700 bg-black flex items-center justify-center relative group">
                                {isYoutube ? (
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        className="aspect-video"
                                        src={embedUrl}
                                        title={bookmark.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] bg-slate-900">
                                        <div className="p-6 border-4 border-slate-700 rounded-full bg-slate-800 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                            <span className="text-6xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">🔗</span>
                                        </div>
                                        <p className="font-retro text-xs text-slate-500 mt-2">NO SIGNAL INPUT</p>
                                    </div>
                                )}
                            </div>

                            {/* Details Section */}
                            <div className="p-6 md:p-8 flex flex-col h-full bg-slate-900 text-slate-100">
                                <div className="space-y-4 flex-1">
                                    <h2 className="text-2xl font-bold leading-tight font-retro text-red-500 drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
                                        {bookmark.title}
                                    </h2>

                                    <div className="flex items-center gap-3 text-sm">
                                        <span className={`px-2 py-1 rounded-sm text-xs font-bold border-2 ${matchPercentage > 90
                                            ? 'bg-green-900 text-green-400 border-green-600'
                                            : 'bg-yellow-900 text-yellow-400 border-yellow-600'
                                            }`}>
                                            {matchPercentage}% MATCH
                                        </span>
                                        <span className="text-slate-400 font-mono text-xs">
                                            {new Date(bookmark.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <p className="text-slate-300 leading-relaxed text-sm border-l-2 border-red-900 pl-4 font-mono">
                                        {bookmark.description || "No tactical briefing available for this mission."}
                                    </p>

                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {bookmark.tags?.map(tag => (
                                            <span key={tag} className="text-xs px-2 py-1 bg-slate-800 border border-slate-600 text-slate-300 font-mono uppercase">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-8 pt-6 border-t-2 border-slate-700 space-y-3">
                                    <a
                                        href={bookmark.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full bg-red-600 text-white py-3 rounded-sm font-bold font-retro uppercase tracking-wider hover:bg-red-700 transition border-b-4 border-red-800 active:border-b-0 active:translate-y-1 group"
                                    >
                                        <ExternalLink size={18} className="group-hover:animate-pulse" />
                                        <span>Initialize Link</span>
                                    </a>
                                    <button
                                        onClick={onClose}
                                        className="w-full py-2 text-slate-500 hover:text-slate-300 font-mono text-xs uppercase tracking-widest hover:bg-slate-800 rounded-sm transition"
                                    >
                                        Abort Mission
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PreviewModal;
