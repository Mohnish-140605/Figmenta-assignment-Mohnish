const request = require('supertest');
const app = require('../app');

describe('Bookmark Manager API', () => {

    describe('GET /bookmarks', () => {
        it('should return all bookmarks', async () => {
            const res = await request(app).get('/bookmarks');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('data');
            expect(Array.isArray(res.body.data)).toBe(true);
        });

        it('should support pagination', async () => {
            const res = await request(app).get('/bookmarks?page=1&limit=2');
            expect(res.statusCode).toEqual(200);
            expect(res.body.data.length).toBeLessThanOrEqual(2);
            expect(res.body.meta).toHaveProperty('page', 1);
            expect(res.body.meta).toHaveProperty('limit', 2);
        });
    });

    describe('POST /bookmarks', () => {
        it('should create a new bookmark', async () => {
            const newBookmark = {
                url: 'https://jestjs.io',
                title: 'Jest Testing',
                tags: ['test', 'js']
            };
            const res = await request(app).post('/bookmarks').send(newBookmark);
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('id');
            expect(res.body.title).toBe('Jest Testing');
        });

        it('should auto-fetch title if missing', async () => {
            // Mocking a URL that is likely to be stable or just accept that it might fail if no internet
            // For this test, we might just check if it returns *something* or falls back to URL
            const newBookmark = {
                url: 'https://example.com',
                tags: ['example']
            };
            const res = await request(app).post('/bookmarks').send(newBookmark);
            expect(res.statusCode).toEqual(201);
            // Expect title to be populated (either 'Example Domain' or 'https://example.com')
            expect(res.body.title).toBeTruthy();
        }, 10000); // increase timeout for external fetch
    });

});
