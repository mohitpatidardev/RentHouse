// Importing mongoose and the required files
const mongoose = require("mongoose");
const initData = require('./data.js');
const Listing = require('../models/listing.js');

// MongoDB URL

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.error("Database connection error", err);
});

async function main() {
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}


const initDB = async () => {
    try {
        await Listing.deleteMany({});
        await Listing.insertMany(initData.data);
        console.log("Data was initialized");
    } catch (error) {
        console.error("Error initializing data:", error);
    }
};

initDB();