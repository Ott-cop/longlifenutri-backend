export class Product {
    title: string | null;
    rating: string | null;
    numberOfReviews: number | null;
    imageUrl: string | null;

    constructor(title: string | null, rating: string | null, numberOfReviews: number | null, imageUrl: string | null) {
        this.title = title;
        this.rating = rating;
        this.numberOfReviews = numberOfReviews;
        this.imageUrl = imageUrl;
    }
}