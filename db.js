// db.js
const mongoose = require('mongoose');

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// Automatically connect when this file is imported
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to the database successfully"))
    .catch(err => {
        console.error("Failed to connect to the database", err);
        throw err;
    });

module.exports = mongoose;
