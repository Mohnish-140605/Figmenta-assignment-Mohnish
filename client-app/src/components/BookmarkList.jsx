import React from 'react';
import BookmarkCard from './BookmarkCard';

function BookmarkList({ bookmarks, onDelete, onEdit, onTagClick, onPreview }) {
    if (bookmarks.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                <p className="text-slate-500">No bookmarks found.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {bookmarks.map(bookmark => (
                <BookmarkCard
                    key={bookmark.id}
                    bookmark={bookmark}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onTagClick={onTagClick}
                    onPreview={onPreview}
                />
            ))}
        </div>
    );
}

export default BookmarkList;
