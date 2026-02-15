import React from 'react';

function BookmarkCard({ bookmark, onDelete, onTagClick, onEdit, onPreview }) {
    const { id, title, url, description, tags, isValid, createdAt } = bookmark;

    return (
        <div
            onClick={() => onPreview && onPreview(bookmark)}
            className={`border-2 rounded-sm p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:translate-y-1 hover:shadow-none transition-all bg-white dark:bg-slate-800 dark:border-slate-700 cursor-pointer group relative active:scale-[0.99]`}
        >
            <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0"> {/* min-w-0 for truncate work */}
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 transition">
                            {title}
                        </h3>
                        {/* Health Badge */}
                        <span
                            className={`text-[10px] px-2 py-0.5 rounded-full border ${isValid
                                ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700'
                                : 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-300 dark:border-red-700'
                                }`}
                            title={isValid ? 'Valid URL' : 'Invalid URL Format'}
                        >
                            {isValid ? '● Valid' : '● Invalid'}
                        </span>
                    </div>

                    <p className="text-xs text-slate-400 dark:text-slate-500 font-mono mb-2 block truncate max-w-md">
                        {url}
                    </p>

                    {description && (
                        <p className="text-slate-600 dark:text-slate-300 text-sm mb-3 line-clamp-2">{description}</p>
                    )}

                    <div className="flex flex-wrap gap-2 mt-auto">
                        {tags.map(tag => (
                            <button
                                key={tag}
                                onClick={(e) => { e.stopPropagation(); onTagClick(tag); }}
                                className="text-xs px-2 py-1 bg-slate-50 text-slate-600 rounded-md hover:bg-slate-100 transition dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                            >
                                #{tag}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex gap-2 ml-4">
                    <button
                        onClick={(e) => { e.stopPropagation(); onEdit(bookmark); }}
                        className="text-slate-400 hover:text-blue-500 transition p-1 dark:text-slate-500 dark:hover:text-blue-400"
                        title="Edit"
                    >
                        ✏️
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(id); }}
                        className="text-slate-400 hover:text-red-500 transition p-1 dark:text-slate-500 dark:hover:text-red-400"
                        title="Delete"
                    >
                        🗑️
                    </button>
                </div>
            </div>
            <div className="mt-2 text-[10px] text-slate-300 text-right">
                Added {new Date(createdAt).toLocaleDateString()}
            </div>
        </div>
    );
}

export default BookmarkCard;
