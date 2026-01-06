const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
    matchKey: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: String,
        default: "N/A"
    },
    matchDay: {
        type: Date,
        default: null
    },
    league: {
        type: String,
        default: "N/A"
    },
    homeTeam: {
        type: String,
        default: "N/A"
    },
    homeTeamLogo: {
        type: String,
        default: "N/A"
    },
    homeScore: {
        type: String,
        default: "N/A"
    },
    awayScore: {
        type: String,
        default: "N/A"
    },
    awayTeamLogo: {
        type: String,
        default: "N/A"
    },
    awayTeam: {
        type: String,
        default: "N/A"
    },
    venue: {
        type: String,
        default: "N/A"
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    }
});

// index for query performance
matchSchema.index({ date: 1 });
matchSchema.index({ league: 1 });

module.exports = mongoose.model("Match", matchSchema);