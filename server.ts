import express from "express";
import scrapeRoutes from "./routes/scrape"

const app = express();
const port = 8080;

app.use("/api", scrapeRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});