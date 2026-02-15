module.exports = (req, res) => {
    res.status(200).json({
        message: 'Debug endpoint is working!',
        timestamp: new Date().toISOString(),
        headers: req.headers,
        url: req.url
    });
};
