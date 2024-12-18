import { IProduct } from "./product.interface";
import { IReview } from "./review.interface";
import { IShop } from "./shop.interface";
import { ICustomer } from "./user.interface";
export interface IOrder {
  id: string;
  customerId: string;
  total: number;
  discounts: number;
  subTotal: number;
  status: "PENDING" | "ONGOING" | "DELIVERED"; // Adjust based on possible statuses
  paymentStatus: "PENDING" | "COMPLETED" | "FAILED"; // Adjust as needed
  transactionId: string;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  items: IOrderItem[];
  customer?: ICustomer;
}

export interface IOrderItem {
  id: string;
  orderId: string;
  productId: string;
  shopId: string;
  size: string | null;
  quantity: number;
  price: number;
  discount: number;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  product: IProduct;
  shop?: IShop;
  order?: IOrder;
  Review: IReview[];
}
