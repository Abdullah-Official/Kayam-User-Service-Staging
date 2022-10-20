
const serverless = require('serverless-http')
const app = require('./app.js')
module.exports.hello = serverless(app)
