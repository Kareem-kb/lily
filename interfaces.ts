export interface CakeOrder {
  occasion: string;
  delivery_date: string;
  cake_tiers: string;
  filling: string;
  imageUrls?: string[]; // Array of image URLs/strings
  description: string;
  name: string;
  email: string;
  phone: string;
  requests?: string;
}
