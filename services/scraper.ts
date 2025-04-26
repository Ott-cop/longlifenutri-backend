import axios from "axios";
import { JSDOM } from "jsdom";
import { Product } from "../models/Product";

export async function scrapeAmazon(keyword: string, page = "1"): Promise<Product[]> {
    try {
        const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}&page=${encodeURIComponent(page)}`;

        const response = await axios.get(url, { 
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
            } 
        });

        const dom = new JSDOM(response.data);
        const document = dom.window.document;

        const products: Product[] = [];

        const productElements = document.querySelectorAll('[data-component-type="s-search-result"]');

        productElements.forEach((product) => {
            const titleEl = product.querySelector('a h2 span');
            const ratingEl = product.querySelector('.a-icon-alt');
            const reviewsEl = product.querySelector('.a-size-base.s-underline-text');
            const imageEl = product.querySelector('img.s-image');
      
            const title = titleEl?.textContent?.trim() || null;
            const ratingText = ratingEl?.textContent?.trim() || null;
            const numberOfReviews = reviewsEl?.textContent?.trim() || null;
            const imageUrl = imageEl?.getAttribute('src') || null;

            products.push(new Product(
                title,
                ratingText,
                numberOfReviews !== null ? parseInt(numberOfReviews) : null,
                imageUrl));
        });

        return products;

    } catch (error) {
        throw new Error("Failed to process the scrape");
    }
}