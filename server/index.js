const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`\n✅ SERVER RUNNING on http://localhost:${PORT}`);
    console.log(`   Health Check: http://localhost:${PORT}/bookmarks\n`);
});
