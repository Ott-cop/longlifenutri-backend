import axios from "axios";
import { JSDOM } from "jsdom";
import { type Product } from "../models/Product";

export async function scrapeAmazon(keyword: string, page = "1"): Promise<Product[]> {
    try {
        const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}&page=${encodeURIComponent(page)}`;
      

        const response = await axios.get(url, {
            headers: {
                // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
                // 'Accept-Language': 'pt-BR,pt;q=0.9',
                'Accept': 'text/html',
            }
        });

        // const response = await fetch(url, {
        //     headers: {
        //       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
        //       'Accept-Language': 'en-US,en;q=0.9',
        //       'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        //     },
        //   });

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
            

            products.push({
                title: title,
                rating: ratingText,
                numberOfReviews: numberOfReviews !== null ? Number(numberOfReviews.replace(",", ".")) : 0,
                imageUrl: imageUrl
            });
        });

        console.log(products);

        return products;

    } catch (error: any) {
        throw new Error(error);
    }
}