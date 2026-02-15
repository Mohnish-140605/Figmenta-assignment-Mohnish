import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBookmarks } from '../hooks/useBookmarks';
import BookmarkForm from '../components/BookmarkForm';
import BookmarkList from '../components/BookmarkList';
import SearchBar from '../components/SearchBar';
import ThemeToggle from '../components/ThemeToggle';
import { LogOut } from 'lucide-react';

const API_URL = '/api/bookmarks';

import EditBookmarkModal from '../components/EditBookmarkModal';
import PreviewModal from '../components/PreviewModal';

const Dashboard = ({ darkMode, toggleTheme, onLogout }) => {
    // Filter State
    const [filterTag, setFilterTag] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('all'); // all, video, site

    // Use Custom Hook
    const {
        bookmarks,
        isLoading: loading,
        error,
        addBookmark,
        editBookmark,
        removeBookmark
    } = useBookmarks(searchQuery, filterType);

    // Edit Modal State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingBookmark, setEditingBookmark] = useState(null);

    // Preview Modal State
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const [previewBookmark, setPreviewBookmark] = useState(null);

    // Filter Logic (Client-side refinement for specific types if needed, otherwise API handles search)
    const isVideo = (url, tags) => {
        const videoSites = ['youtube.com', 'youtu.be', 'vimeo.com', 'twitch.tv'];
        const isVideoUrl = videoSites.some(site => url.includes(site));
        const hasVideoTag = tags && tags.some(t => ['video', 'movie', 'film'].includes(t.toLowerCase()));
        return isVideoUrl || hasVideoTag;
    };

    const filteredBookmarks = bookmarks.filter(b => {
        if (filterTag) return b.tags.includes(filterTag);

        const isBookmarkVideo = isVideo(b.url, b.tags);
        if (filterType === 'video') return isBookmarkVideo;
        if (filterType === 'site') return !isBookmarkVideo;
        return true;
    });

    const handleAddBookmark = async (bookmark) => {
        const result = await addBookmark(bookmark);
        if (!result.success) alert(result.error);
    };

    const handleDeleteBookmark = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        const result = await removeBookmark(id);
        if (!result.success) alert(result.error);
    };

    const handleUpdateBookmark = async (id, updatedData) => {
        const result = await editBookmark(id, updatedData);
        if (!result.success) alert(result.error);
        setIsEditModalOpen(false);
    };

    // Edit Handlers
    const openEditModal = (bookmark) => {
        setEditingBookmark(bookmark);
        setIsEditModalOpen(true);
    };

    // Preview Handlers
    const openPreview = (bookmark) => {
        setPreviewBookmark(bookmark);
        setIsPreviewModalOpen(true);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`min-h-screen p-8 transition-colors duration-300 ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}
        >
            {/* Header */}
            <header className="mb-8 relative max-w-4xl mx-auto flex items-center justify-between font-retro">
                <div className="text-center md:text-left">
                    <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 drop-shadow-[2px_2px_0_rgba(255,255,255,0.2)]">
                        BOOKMARK MANAGER
                    </h1>
                    <p className="text-xs md:text-sm text-slate-500 mt-2 font-mono uppercase tracking-widest">
                        UNLEASH YOUR IMAGINATION
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
                    <button
                        onClick={onLogout}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-sm transition border-2 border-red-500"
                        title="Logout"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </header>

            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center max-w-4xl mx-auto">
                    {error}
                </div>
            )}

            <div className="grid gap-8 md:grid-cols-[1fr_2fr] max-w-4xl mx-auto">
                <aside>
                    <BookmarkForm onAdd={handleAddBookmark} darkMode={darkMode} />
                </aside>

                <main className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <SearchBar value={searchQuery} onChange={setSearchQuery} darkMode={darkMode} />

                        {/* Type Filter Pills */}
                        <div className="flex bg-slate-200 p-1 rounded-lg dark:bg-slate-800 shrink-0">
                            {['all', 'video', 'site'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setFilterType(type)}
                                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all capitalize ${filterType === type
                                        ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-indigo-400'
                                        : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {filterTag && (
                        <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full w-fit">
                            <span>Tag: {filterTag}</span>
                            <button onClick={() => setFilterTag(null)} className="hover:text-blue-900">×</button>
                        </div>
                    )}

                    {loading && !searchQuery && !filterTag ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="animate-pulse flex space-x-4 p-4 border rounded-lg dark:border-slate-700">
                                    <div className="flex-1 space-y-4 py-1">
                                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                                        <div className="space-y-2">
                                            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                                            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <motion.div layout className="space-y-4">
                            <AnimatePresence>
                                {filteredBookmarks.map((bookmark) => (
                                    <motion.div
                                        key={bookmark.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        layout
                                    >
                                        <BookmarkList
                                            bookmarks={[bookmark]}
                                            onDelete={handleDeleteBookmark}
                                            onEdit={openEditModal}
                                            onTagClick={setFilterTag}
                                            onPreview={openPreview}
                                            darkMode={darkMode}
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </main>
            </div>

            <EditBookmarkModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                bookmark={editingBookmark}
                onUpdate={handleUpdateBookmark}
                darkMode={darkMode}
            />

            <PreviewModal
                isOpen={isPreviewModalOpen}
                onClose={() => setIsPreviewModalOpen(false)}
                bookmark={previewBookmark}
            />
        </motion.div>
    );
};

export default Dashboard;
