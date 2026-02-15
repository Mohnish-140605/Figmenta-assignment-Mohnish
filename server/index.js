const app = require('./app');

const PORT = process.env.PORT || 5000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`\n✅ SERVER RUNNING on http://localhost:${PORT}`);
        console.log(`   Health Check: http://localhost:${PORT}/bookmarks\n`);
    });
}

module.exports = app;
