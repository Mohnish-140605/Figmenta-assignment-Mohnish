import React, { useEffect, useState } from 'react';

const SUGGESTION_MAP = {
    github: 'code',
    gitlab: 'code',
    stackoverflow: 'code',
    medium: 'blog',
    dev: 'blog',
    hashnode: 'blog',
    youtube: 'video',
    vimeo: 'video',
    figma: 'design',
    dribbble: 'design',
    behance: 'design',
    openai: 'ai',
    chatgpt: 'ai',
    react: 'frontend',
    vue: 'frontend',
    node: 'backend',
    express: 'backend'
};

function TagSuggestions({ title = '', url = '', onAddTag, currentTags = [] }) {
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const text = (title + ' ' + url).toLowerCase();
        const newSuggestions = new Set();

        Object.keys(SUGGESTION_MAP).forEach(key => {
            if (text.includes(key)) {
                newSuggestions.add(SUGGESTION_MAP[key]);
            }
        });

        // Filter out already added tags
        const filtered = Array.from(newSuggestions).filter(tag => !currentTags.includes(tag));
        setSuggestions(filtered);
    }, [title, url, currentTags]);

    if (suggestions.length === 0) return null;

    return (
        <div className="mt-2 animate-pulse">
            <p className="text-xs text-slate-500 mb-1">Smart Suggestions:</p>
            <div className="flex flex-wrap gap-2">
                {suggestions.map(tag => (
                    <button
                        key={tag}
                        type="button"
                        onClick={() => onAddTag(tag)}
                        className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-md hover:bg-indigo-200 transition"
                    >
                        + {tag}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default TagSuggestions;
