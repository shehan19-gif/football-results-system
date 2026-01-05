const mongoose = require("mongoose");

async function dbConnection(connectionString) {
    return await mongoose.connect(connectionString);
}

module.exports = dbConnection;