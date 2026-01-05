const puppeteer = require("puppeteer");

async function getScores(day, month, year) {
    const results = [];
    let matchId = 0;
    
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    try {
        const page = await browser.newPage();

        await page.goto(`https://www.bbc.com/sport/football/scores-fixtures/${year}-${month}-${day}`, {
            waitUntil: "networkidle2",
            timeout: 30000
        })

        const matchLinks = await page.$$eval(".e4zdov50 .e1dih4s30 .ssrcss-1vu9la4-OnwardJourneyLink", anchors => anchors.map(anchor => anchor.href));

        for (const link of matchLinks) {
            await page.goto(link, {
                waitUntil: "networkidle2",
                timeout: Math.ceil(Math.random() * 11000) + 20000
            });

            const date = await page.$eval("time.ejf0oom1", el => el.textContent);

            const league = await page.$eval("div.ejf0oom0", el => el.textContent);
            
            const homeTeam = await page.$eval("div.ssrcss-bon2fo-WithInlineFallback-TeamHome span.emlpoi30", el => el.textContent);
            
            const homeTeamLogo = await page.$eval("div.ssrcss-bon2fo-WithInlineFallback-TeamHome img.ssrcss-1knyx38-BadgeImage", el => el.src);
            
            const homeScore = await page.$eval("div.ssrcss-y5s079-WithInlineFallback-Scores div.ssrcss-qsbptj-HomeScore", el => el.textContent);
            
            const awayScore = await page.$eval("div.ssrcss-y5s079-WithInlineFallback-Scores div.ssrcss-fri5a2-AwayScore", el => el.textContent);
            
            const awayTeamLogo = await page.$eval("div.ssrcss-nvj22c-WithInlineFallback-TeamAway img.ssrcss-1knyx38-BadgeImage", el => el.src);
            
            const awayTeam = await page.$eval("div.ssrcss-nvj22c-WithInlineFallback-TeamAway span.emlpoi30", el => el.textContent);
            
            const venue = await page.$eval("div.ssrcss-x07iau-Venue", el => el.textContent);

            const match = {
                matchId: matchId++,
                date: date.trim(),
                matchDay: new Date(date.trim()),
                league: league.trim(),
                homeTeam: homeTeam.trim(),
                homeTeamLogo: homeTeamLogo,
                homeScore: homeScore.trim(),
                awayScore: awayScore.trim(),
                awayTeamLogo: awayTeamLogo,
                awayTeam: awayTeam.trim(),
                venue: venue.slice(6).trim()
            }

            results.push(match);
        }

        return results;

    } catch (err) {
        console.error("Error: ", err)
    } finally {
        await browser.close();
    }
}


async function datePicker() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const formattedYesterday = yesterday.toISOString().split("T")[0].split("-");

    const year = formattedYesterday[0];
    const month = formattedYesterday[1];
    const day = formattedYesterday[2];

    const data = await getScores(day, month, year);
    
    return data;
}

module.exports = { datePicker };