const Match = require("../../shared/models/Match");

async function getAllMatchResults(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    if (page < 1 || limit < 1 || limit > 100) {
      throw new Error(
        "Invalid pagination parameters. Page must be >= 1, limit between 1-100"
      );
    }

    const data = await Match.find()
      .select("matchKey league homeTeam awayTeam homeScore awayScore date")
      .skip(skip)
      .limit(limit)
      .lean();

    return res.status(200).json({ matches: data });
  } catch (err) {
    console.log("Error: ", err);
    return res.status(500).json({ message: "Not found data!", error: err });
  }
}

async function getSpecificResults(req, res) {
  try {
    const queryTeam = req.query.team ? req.query.team.replace(/"/g, "") : "";
    const queryLeague = req.query.league
      ? req.query.league.replace(/"/g, "")
      : "";
    const queryDate = req.query.date ? req.query.date.replace(/"/g, "") : "";

    if (queryTeam && queryDate) {
      const data = await Match.find({
        $or: [{ homeTeam: queryTeam }, { awayTeam: queryTeam }],
        date: queryDate,
      }).select("matchKey league homeTeam awayTeam homeScore awayScore date");

      return res.status(200).json({ matches: data });
    }

    if (queryLeague && queryDate) {
      const data = await Match.find({
        league: queryLeague,
        date: queryDate,
      }).select("matchKey league homeTeam awayTeam homeScore awayScore date");

      return res.status(200).json({ matches: data });
    }

    if (queryTeam) {
      const data = await Match.find({
        $or: [{ homeTeam: queryTeam }, { awayTeam: queryTeam }],
      }).select("matchKey league homeTeam awayTeam homeScore awayScore date");

      return res.status(200).json({ matches: data });
    }

    if (queryLeague) {
      const data = await Match.find({
        league: queryLeague,
      }).select("matchKey league homeTeam awayTeam homeScore awayScore date");

      return res.status(200).json({ matches: data });
    }

    if (queryDate) {
      const data = await Match.find({
        date: queryDate,
      }).select("matchKey league homeTeam awayTeam homeScore awayScore date");

      return res.status(200).json({ matches: data });
    }

    return res.status(400).json({ message: "Query error !" });
  } catch (err) {
    console.log("Error: ", err);
    return res.status(500).json({ message: "Not found data!" });
  }
}

module.exports = { getAllMatchResults, getSpecificResults };
