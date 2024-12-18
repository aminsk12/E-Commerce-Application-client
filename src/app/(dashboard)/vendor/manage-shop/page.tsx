import React from "react";

import AddShop from "./AddShop";
import AddProduct from "./AddProduct";
import AddCoupon from "./AddCupon";

const ManageShop = () => {
  return (
    <div className="py-4 px-4 ">
      <div className="max-w-6xl justify-items-center mx-auto grid gap-8 ">
        {/* Add Shop Form */}
        <AddShop></AddShop>
        {/* Add Product Form */}
        <AddProduct></AddProduct>
        <AddCoupon></AddCoupon>
      </div>
    </div>
  );
};

export default ManageShop;
