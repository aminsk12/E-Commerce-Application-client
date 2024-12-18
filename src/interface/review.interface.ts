export interface IReview {
  reviewId: string;
  orderItemId: string;
  customerId: string;
  productId: string;
  rating: number; // Assuming rating is a numerical value (e.g., 1 to 5)
  comment: string; // Assuming comments are textual
  vendorReply: string | null; // Vendor reply can be a string or null
  createdAt: Date; // Timestamps are stored as Date objects
  updatedAt: Date;
  customer?: {
    name: string;
    customerId: string;
    email: string;
  };
  product?: {
    productId: string;
    name: string;
    images: string[];
  };
}
