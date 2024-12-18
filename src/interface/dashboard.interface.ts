export interface IUserDashboardData {
  totalOrders: number; // Total number of orders placed by the user
  totalSpent: number; // Total amount spent by the user
  totalDiscounts: number; // Total discounts received by the user
  orderStatus: {
    [status: string]: number; // Orders categorized by status (e.g., pending, ongoing, delivered)
  };
  paymentStatus: {
    [status: string]: number; // Payments categorized by status (e.g., pending, completed, failed)
  };
  totalFollowers: number; // Number of shops the user follows
  totalReviews: number; // Total reviews left by the user
}
