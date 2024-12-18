# Next Mart

Next Mart is a comprehensive e-commerce platform designed to provide a seamless online shopping experience for users, vendors, and administrators. It features advanced functionalities such as product browsing, vendor shop management, secure checkout, and robust admin controls to create a scalable and high-performance system.

## Live URL
- **Frontend**: [Frontend Live URL](https://nextmart-blue.vercel.app)
- **Backend**: [Backend Live URL](https://nextmartserver.vercel.app)

---

## Technology Stack & Packages

### **Backend**
- **Server**: Node.js with Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma
- **Authentication**: JSON Web Tokens (JWT)
- **File Uploads**: Cloudinary (for image storage)

### **Frontend**
- **Framework**: Next.js
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS and shadcn/ui

### **Packages**
- `bcrypt`: Password hashing
- `jsonwebtoken`: For JWT-based authentication
- `cors`: Cross-Origin Resource Sharing
- `prisma`: ORM for PostgreSQL
- `amarPay`: Payment integration
- `sonner`: Notifications
- `react-query`: Data fetching and caching
- `react-hook-form`: Form handling and validation


## Key Features & Functionality

### **Admin**
- Manage **Users**, **Vendors**, and **Shops** with advanced controls.
- Dynamically control **Product Categories** for flexibility.
- Monitor **Transactions** and **Platform Activity** for insights.

---

### **Vendor**
- Create and manage **Shops** effortlessly.
- Add, edit, and **Duplicate Products** with detailed inventory controls.
- View and respond to **Customer Reviews**.
- Access **Order History** specific to their shop for tracking and analysis.

---

### **User (Customer)**
- **Browse and Filter Products** to find what you need quickly.
- Compare products within the same category.
- Manage a **Cart** with **Vendor-Specific Restrictions** to avoid conflicts.
- Checkout using **Coupon Codes** and enjoy secure payment methods.
- Access **Order History** and leave reviews for purchased items.

## Installation

To run the project locally, follow these steps:
1. **Clone the Repository**:
   ```bash
   cd NextBuy-client
   https://github.com/Abir-7/NextBuy-client
   run npm install
2. **Create .env.local**:
   ```bash
      NEXT_PUBLIC_CLOUDINARY_PRESET=
   NEXT_PUBLIC_CLOUDINARY_CLOUDNAME=
      NEXT_PUBLIC_API_URL=

  1. **Clone the Repository(backend)**:
   ```bash
   cd NextBuy-client
   https://github.com/Abir-7/NextBuy-server
   run npm install
2. **Create .env**:
   ```bash
      DATABASE_URL=
      NODE_ENV=
      PORT=
      SALTROUNDS=
   JWT_ACCESS_SECRET=
      JWT_ACCESS_EXPIRES_IN=
      # amar pay
      Store_ID=
      Signature_Key=
      Api_EndPoint=
   EMAIL_PASS=EMAIL_USER=

