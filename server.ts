import express from "express";
import cors from "cors";
import scrapeRoutes from "./routes/scrape"

const app = express();
const port = 8080;

const corsOptions: cors.CorsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false, 
};

app.use(cors());

app.use("/api", scrapeRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});