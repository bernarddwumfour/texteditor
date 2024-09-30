const express = require("express");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.post("/fetch-metadata", async (req, res) => {
  const { url } = req.body;

  try {
    const browser = await puppeteer.launch({
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    const content = await page.content();
    await browser.close();

    const $ = cheerio.load(content);

    const metadata = {
      title: $("title").text(),
      description:
        $('meta[name="description"]').attr("content") ||
        $('meta[property="og:description"]').attr("content") ||
        $('meta[name="og:description"]').attr("content") ||
        $('meta[name="twitter:description"]').attr("content") ||
        "",
      image:
        $('meta[property="og:image"]').attr("content") ||
        $('meta[name="og:image"]').attr("content") ||
        $('meta[name="twitter:image"]').attr("content") ||
        "",
    };

    res.json(metadata);
  } catch (error) {
    console.error("Error fetching metadata:", error);
    res.status(500).send("Error fetching metadata");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
