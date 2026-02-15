import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const EditBookmarkModal = ({ bookmark, isOpen, onClose, onUpdate, darkMode }) => {
    const [formData, setFormData] = useState({
        url: '',
        title: '',
        description: '',
        tags: []
    });
    const [tagInput, setTagInput] = useState('');

    useEffect(() => {
        if (bookmark) {
            setFormData({
                url: bookmark.url || '',
                title: bookmark.title || '',
                description: bookmark.description || '',
                tags: bookmark.tags || []
            });
        }
    }, [bookmark]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddTag = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const tag = tagInput.trim();
            if (tag && !formData.tags.includes(tag)) {
                if (formData.tags.length >= 5) {
                    alert('Maximum 5 tags allowed');
                    return;
                }
                setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
                setTagInput('');
            }
        }
    };

    const removeTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(bookmark.id, formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-slate-900 w-full max-w-2xl rounded-sm shadow-2xl border-4 border-slate-700 relative text-slate-100">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-500 hover:text-red-500 transition"
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold mb-6 p-6 border-b-2 border-slate-700 font-retro text-red-500">
                    EDIT MISSION DATA
                </h2>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">URL</label>
                        <input
                            type="url"
                            name="url"
                            value={formData.url}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-transparent border-slate-300 dark:border-slate-600"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Title (Max 200 chars)</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            maxLength={200}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-transparent border-slate-300 dark:border-slate-600"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description (Max 500 chars)</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            maxLength={500}
                            rows="3"
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-transparent border-slate-300 dark:border-slate-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Tags (Max 5)</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {formData.tags.map(tag => (
                                <span key={tag} className="bg-slate-700 text-slate-300 border border-slate-500 px-2 py-1 rounded-sm text-xs flex items-center gap-1 font-mono">
                                    #{tag}
                                    <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500">×</button>
                                </span>
                            ))}
                        </div>
                        <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleAddTag}
                            placeholder={formData.tags.length >= 5 ? "Max tags reached" : "Type tag and press Enter"}
                            disabled={formData.tags.length >= 5}
                            className="w-full px-3 py-2 border-2 border-slate-600 rounded-sm text-sm focus:ring-0 focus:border-red-500 transition bg-slate-800 text-slate-100 placeholder-slate-500 font-mono"
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-8 pt-4 border-t-2 border-slate-700">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-slate-400 font-mono text-xs uppercase hover:text-white transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-red-600 text-white px-6 py-2 rounded-sm hover:bg-red-700 transition font-mono font-bold uppercase tracking-wider border-b-4 border-red-800 active:border-b-0 active:translate-y-1"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBookmarkModal;
