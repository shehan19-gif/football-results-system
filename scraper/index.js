require("dotenv").config({path: "../../.env"});
const path = require("path");
const mongoose = require("mongoose");
const { datePicker } = require(path.join(__dirname, "scrapers", "scores"));
const dbConnection = require(path.join(__dirname, "../shared/config/db-connection"));
const { saveMatches } = require(path.join(__dirname, "services", "service"));

dbConnection(process.env.CONNECTION_STRING)
    .catch(err => console.log("Error: ", err));

async function run() {
    try {
        
        console.log("🚀 Scraper started");

        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("✅ DB connected");

        const matches = await datePicker();
        console.log(`⚽ Scraped ${matches.length} matches`);

        await saveMatches(matches);
        console.log("✅ Matches saved");

    } catch (err) {
        
        console.error("❌ Error:", err);
        process.exitCode = 1;

    } finally {
        
        await mongoose.disconnect();
        console.log("🔌 DB disconnected");
        console.log("🏁 Scraper finished");
        
    }
}

run();