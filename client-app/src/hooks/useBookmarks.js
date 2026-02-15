import { useState, useEffect } from 'react';
import { fetchBookmarks, createBookmark, updateBookmark, deleteBookmark } from '../services/api';

export const useBookmarks = (searchQuery, filterType) => {
    const [bookmarks, setBookmarks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initial load
    useEffect(() => {
        loadBookmarks();
    }, [searchQuery, filterType]);

    const loadBookmarks = async () => {
        setIsLoading(true);
        try {
            const data = await fetchBookmarks(searchQuery, filterType);
            // Handle pagination wrapper if present, otherwise assume array
            setBookmarks(data.data || data);
            setError(null);
        } catch (err) {
            console.error("Load Error:", err);
            const msg = err.response?.data?.error || err.message || "Failed to load data.";
            setError(msg);
        } finally {
            setIsLoading(false);
        }
    };

    const addBookmark = async (newBookmark) => {
        try {
            const added = await createBookmark(newBookmark);
            setBookmarks(prev => [added, ...prev]);
            return { success: true };
        } catch (err) {
            return { success: false, error: err.response?.data?.error || "Failed to add" };
        }
    };

    const editBookmark = async (id, updatedData) => {
        try {
            const updated = await updateBookmark(id, updatedData);
            setBookmarks(prev => prev.map(b => b.id === id ? updated : b));
            return { success: true };
        } catch (err) {
            return { success: false, error: err.response?.data?.error || "Failed to update" };
        }
    };

    const removeBookmark = async (id) => {
        try {
            await deleteBookmark(id);
            setBookmarks(prev => prev.filter(b => b.id !== id));
            return { success: true };
        } catch (err) {
            return { success: false, error: "Failed to delete" };
        }
    };

    return {
        bookmarks,
        isLoading,
        error,
        addBookmark,
        editBookmark,
        removeBookmark,
        refresh: loadBookmarks
    };
};
