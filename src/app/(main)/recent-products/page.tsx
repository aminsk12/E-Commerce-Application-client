"use client";
import AllProduct from "@/components/ui_component/common/AllProduct/AllProduct";
import { IProduct } from "@/interface/product.interface";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [recentProducts, setRecentProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const storedProducts = JSON.parse(
      localStorage.getItem("recentProducts") || "[]"
    );
    setRecentProducts(storedProducts);
  }, []);

  return (
    <div>
      <AllProduct data={recentProducts} />
    </div>
  );
};

export default Page;
