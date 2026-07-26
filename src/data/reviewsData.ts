import reviews from "./reviews.json";

export interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  text: Record<string, string>;
}

export const reviewsData: Review[] = reviews;

export const getReviewText = (review: Review, language: string): string =>
  review.text[language] ?? review.text.en;
