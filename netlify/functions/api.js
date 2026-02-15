const serverless = require('serverless-http');
const app = require('../../api/app'); // Import from api directory

module.exports.handler = serverless(app);
