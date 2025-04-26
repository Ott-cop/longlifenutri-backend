import express, { type Request, type Response } from "express";
import { scrapeAmazon } from "../services/scraper";

const router = express.Router();

router.get("/scrape", async (req: Request, res: Response) => {
    const keyword = req.query.keyword as string;
    const page = req.query.page as string || "1";

    if (!keyword) {
        res.status(400).json({ error: "Keyword query parameter is required" });
        return;
    }

    try {
        const products = await scrapeAmazon(keyword, page);
        res.status(200).json(products);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to scrape Amazon" });
    }
});

export default router;