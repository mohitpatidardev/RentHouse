const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing.js'); 
const path = require('path');

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// Connect to the database
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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));


// Root route
app.get("/", (req, res) => {
    res.send("Root working...");
});

app.get("/listings", async (req, res) => {
    try {
        const alllistings = await Listing.find({});
        res.render('listings/index', { alllistings });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error occurred while fetching listings.");
    }
});    

// Testing route for adding a listing
// app.get("/testing", async (req, res) => {
//     try {
//         // Hardcoded data for the listing
//         const newListing = new Listing({
//             title: "Luxury Villa",
//             description: "A beautiful luxury villa with 5 bedrooms, a pool, and a garden.",
//             price: 500000,
//             location: "Los Angeles",
//             country: "USA",
//         });

//         // Save the listing to the database
//         await newListing.save();

//         // Send success response
//         res.send("Success: Listing added");
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Error saving the data");
//     }
// });

// Start the server on port 8080
app.listen(8080, () => {
    console.log("Server listening on port 8080");
});
