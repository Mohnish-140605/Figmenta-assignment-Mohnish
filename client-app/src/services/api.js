import axios from 'axios';

const API_URL = import.meta.env.PROD
    ? '/api/bookmarks'
    : 'http://localhost:5000/bookmarks';

export const fetchBookmarks = async (search = '', filter = '', page = 1, limit = 999) => {
    try {
        const response = await axios.get(API_URL, {
            params: { search, filter, page, limit }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching bookmarks:", error);
        throw error;
    }
};

export const createBookmark = async (bookmarkData) => {
    try {
        const response = await axios.post(API_URL, bookmarkData);
        return response.data;
    } catch (error) {
        console.error("Error creating bookmark:", error);
        throw error;
    }
};

export const updateBookmark = async (id, bookmarkData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, bookmarkData);
        return response.data;
    } catch (error) {
        console.error("Error updating bookmark:", error);
        throw error;
    }
};

export const deleteBookmark = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting bookmark:", error);
        throw error;
    }
};
