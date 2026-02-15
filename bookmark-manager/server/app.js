const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const rateLimit = require('express-rate-limit');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

app.use(cors());
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: 'Too many requests, please try again later.' }
});
app.use(limiter);

// Request logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

let bookmarks = [
    {
        id: uuidv4(),
        url: 'https://github.com/facebook/react',
        title: 'React GitHub Repository',
        description: 'The library for web and native user interfaces',
        tags: ['code', 'frontend', 'library'],
        createdAt: new Date().toISOString(),
        isValid: true
    },
    {
        id: uuidv4(),
        url: 'https://medium.com/tag/javascript',
        title: 'Medium JavaScript Articles',
        description: 'Read writing about Javascript on Medium.',
        tags: ['blog', 'javascript', 'reading'],
        createdAt: new Date().toISOString(),
        isValid: true
    },
    {
        id: uuidv4(),
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        title: 'Rick Astley - Never Gonna Give You Up',
        description: 'The official video for Never Gonna Give You Up by Rick Astley',
        tags: ['video', 'music', 'classic'],
        createdAt: new Date().toISOString(),
        isValid: true
    },
    {
        id: uuidv4(),
        url: 'https://help.figma.com/hc/en-us',
        title: 'Figma Help Center',
        description: 'Learn how to use Figma for design.',
        tags: ['design', 'ui', 'ux'],
        createdAt: new Date().toISOString(),
        isValid: true
    },
    {
        id: uuidv4(),
        url: 'https://openai.com/blog',
        title: 'OpenAI Blog',
        description: 'Announcements and research from OpenAI.',
        tags: ['ai', 'tech', 'future'],
        createdAt: new Date().toISOString(),
        isValid: true
    }
];

const checkUrlHealth = (url) => {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
};

const router = express.Router();

// Metadata Fetching Helper
const fetchMetadata = async (url) => {
    try {
        const { data } = await axios.get(url, {
            headers: { 'User-Agent': 'Mozilla/5.0 (compatible; BenchmarkManager/1.0)' },
            timeout: 5000
        });
        const $ = cheerio.load(data);
        const title = $('title').text().trim();
        return title || null;
    } catch (error) {
        console.error('Metadata fetch error:', error.message);
        return null;
    }
};

router.get('/bookmarks', (req, res) => {
    const { tag, page = 1, limit = 10 } = req.query;

    let filtered = bookmarks;
    if (tag) {
        filtered = bookmarks.filter(b => b.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;

    const paginatedResults = filtered.slice(startIndex, endIndex);

    res.json({
        data: paginatedResults,
        meta: {
            total: filtered.length,
            page: pageNum,
            limit: limitNum,
            totalPages: Math.ceil(filtered.length / limitNum)
        }
    });
});

router.post('/bookmarks', async (req, res) => {
    let { url, title, description, tags } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    // Auto-fetch title if missing
    if (!title) {
        const fetchedTitle = await fetchMetadata(url);
        title = fetchedTitle || url; // Fallback to URL if title fetch fails
    }

    const isValid = checkUrlHealth(url);

    const newBookmark = {
        id: uuidv4(),
        url,
        title,
        description: description || '',
        tags: Array.isArray(tags) ? tags.map(t => t.toLowerCase()) : [],
        createdAt: new Date().toISOString(),
        isValid
    };

    bookmarks.unshift(newBookmark);
    res.status(201).json(newBookmark);
});

router.put('/bookmarks/:id', (req, res) => {
    const { id } = req.params;
    const { url, title, description, tags } = req.body;

    const index = bookmarks.findIndex(b => b.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Bookmark not found' });
    }

    const existing = bookmarks[index];
    const isValid = url ? checkUrlHealth(url) : existing.isValid;

    bookmarks[index] = {
        ...existing,
        url: url || existing.url,
        title: title || existing.title,
        description: description !== undefined ? description : existing.description,
        tags: Array.isArray(tags) ? tags.map(t => t.toLowerCase()) : existing.tags,
        isValid
    };

    res.json(bookmarks[index]);
});

router.delete('/bookmarks/:id', (req, res) => {
    const { id } = req.params;
    const initialLength = bookmarks.length;
    bookmarks = bookmarks.filter(b => b.id !== id);

    if (bookmarks.length === initialLength) {
        return res.status(404).json({ error: 'Bookmark not found' });
    }

    res.status(204).send();
});

// Mount Router
app.use('/api', router);
app.use('/', router);

module.exports = app;
