import React, { useState } from 'react';
import TagSuggestions from './TagSuggestions';

function BookmarkForm({ onAdd }) {
    const [formData, setFormData] = useState({
        url: '',
        title: '',
        description: '',
        tags: []
    });
    const [tagInput, setTagInput] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddTag = (tag) => {
        if (tag && !formData.tags.includes(tag)) {
            setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
        }
        setTagInput('');
    };

    const removeTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag(tagInput.trim());
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.url || !formData.title) return;
        onAdd(formData);
        setFormData({ url: '', title: '', description: '', tags: [] });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 sticky top-4">
            <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">Add New Bookmark</h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">URL <span className="text-red-500">*</span></label>
                    <input
                        type="url"
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                        placeholder="https://example.com"
                        className="w-full px-3 py-2 border-2 border-slate-300 rounded-sm focus:ring-0 focus:border-red-500 outline-none transition bg-white dark:bg-slate-900 dark:border-slate-600 dark:text-slate-50 dark:placeholder-slate-500 font-mono text-sm"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Bookmark Title"
                        className="w-full px-3 py-2 border-2 border-slate-300 rounded-sm focus:ring-0 focus:border-red-500 transition bg-white dark:bg-slate-900 dark:border-slate-600 dark:text-slate-50 dark:placeholder-slate-500 font-mono text-sm"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="2"
                        placeholder="Optional description..."
                        className="w-full px-3 py-2 border-2 border-slate-300 rounded-sm focus:ring-0 focus:border-red-500 transition bg-white dark:bg-slate-900 dark:border-slate-600 dark:text-slate-50 dark:placeholder-slate-500 h-24 font-mono text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tags</label>
                    <div className="flex gap-2 mb-2 flex-wrap">
                        {formData.tags.map(tag => (
                            <span key={tag} className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs flex items-center gap-1">
                                #{tag}
                                <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500">×</button>
                            </span>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type tag and press Enter"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 transition bg-white dark:bg-slate-900 dark:border-slate-600 dark:text-slate-50 dark:placeholder-slate-400"
                    />

                    <TagSuggestions
                        title={formData.title}
                        url={formData.url}
                        currentTags={formData.tags}
                        onAddTag={handleAddTag}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-red-600 text-white py-2 px-4 rounded-sm hover:bg-red-700 transition font-mono font-bold uppercase tracking-wider border-b-4 border-red-800 active:border-b-0 active:translate-y-1"
                >
                    Add Bookmark
                </button>
            </div>
        </form>
    );
}

export default BookmarkForm;
