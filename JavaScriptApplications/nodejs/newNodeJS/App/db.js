const mongodb = require('./mongodb');

module.exports = connectionString => mongodb.connect(connectionString);