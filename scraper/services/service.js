const path = require("path");
const Match = require(path.join(__dirname, "../../shared/models/Match"));

async function saveMatches(matches) {
    
    for (const match of matches) {
        try {
            const { matchKey, date, matchDay, league, homeTeam, homeTeamLogo, homeScore, awayScore, awayTeamLogo, awayTeam, venue } = match;

            await Match.updateOne({
                matchKey: matchKey
            }, {$set: match}, {upsert: true});

        } catch (err) {
            console.log("Error: ", err);
        }
    }
}

module.exports = { saveMatches };