export interface IUserToken {
  userEmail: string;
  role: "CUSTOMER" | "ADMIN" | "VENDOR" | "SUPERADMIN"; // Add other roles if needed
  iat: number; // Issued At (timestamp)
  exp: number; // Expiry (timestamp)
}
