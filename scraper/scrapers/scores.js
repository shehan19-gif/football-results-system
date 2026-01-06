const puppeteer = require("puppeteer");

async function safeText(page, selector) {
  try {
    return await page.$eval(selector, (el) => el.textContent);
  } catch {
    return null;
  }
}

async function safeAttr(page, selector) {
  try {
    return await page.$eval(selector, (el) => el.src);
  } catch {
    return null;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getScores(day, month, year) {
    const results = [];
    
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    try {
        const page = await browser.newPage();

        await page.goto(`${process.env.LINK}/${year}-${month}-${day}`, {
            waitUntil: "networkidle2",
            timeout: 30000
        })

        const matchLinks = await page.$$eval(".e4zdov50 .e1dih4s30 .ssrcss-1vu9la4-OnwardJourneyLink", anchors => anchors.map(anchor => anchor.href));

        for (const link of matchLinks) {
            await page.goto(link, {
                waitUntil: "networkidle2",
                timeout: Math.ceil(Math.random() * 11000) + 20000
            });

            const date =  await safeText(page, "time.ejf0oom1");

            const league = await safeText(page, "div.ejf0oom0");
            
            const homeTeam = await safeText(
                page,
                "div.ssrcss-bon2fo-WithInlineFallback-TeamHome span.emlpoi30"
            );
            
            const homeTeamLogo = await safeAttr(
                page,
                "div.ssrcss-bon2fo-WithInlineFallback-TeamHome img.ssrcss-1knyx38-BadgeImage"
            );
            
            const homeScore = await safeText(
                page,
                "div.ssrcss-y5s079-WithInlineFallback-Scores div.ssrcss-qsbptj-HomeScore"
            );
            
            const awayScore = await safeText(
                page,
                "div.ssrcss-y5s079-WithInlineFallback-Scores div.ssrcss-fri5a2-AwayScore"
            );
            
            const awayTeamLogo = await safeAttr(
                page,
                "div.ssrcss-nvj22c-WithInlineFallback-TeamAway img.ssrcss-1knyx38-BadgeImage"
            );
            
            const awayTeam = await safeText(
                page,
                "div.ssrcss-nvj22c-WithInlineFallback-TeamAway span.emlpoi30"
            );
            
            const venue = await safeText(page, "div.ssrcss-x07iau-Venue");

            const matchDay = new Date(date.trim());
            const formattedDate = `${String(matchDay.getDate()).padStart(2,"0")}-${String(matchDay.getMonth() + 1).padStart(2, "0")}-${matchDay.getFullYear()}`;

            const match = {
                matchKey: `${formattedDate}_${homeTeam}`,
                date: formattedDate,
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

            await sleep(2000 + Math.random() * 2000);
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