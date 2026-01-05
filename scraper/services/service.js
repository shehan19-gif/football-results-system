const path = require("path");
const Match = require(path.join(__dirname, "../../shared/models/Match"));

async function saveMatches(matches) {
    
    for (const match of matches) {
        try {
            const { matchId, date, matchDay, league, homeTeam, homeTeamLogo, homeScore, awayScore, awayTeamLogo, awayTeam, venue } = match;

            await Match.updateOne({
                league: match.league,
                homeTeam: match.homeTeam,
                awayTeam: match.awayTeam,
                matchDay: match.matchDay
            }, {$set: match}, {upsert: true});

        } catch (err) {
            console.log("Error: ", err);
        }
    }
}

module.exports = { saveMatches };