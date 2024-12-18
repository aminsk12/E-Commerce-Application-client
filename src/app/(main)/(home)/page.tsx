"use client";
import Banner from "@/components/ui_component/homePage/Banner";
import Categories from "@/components/ui_component/homePage/Categories";
import FlashSale from "@/components/ui_component/homePage/FlashSale";
import VendorProducts from "@/components/ui_component/homePage/VendorProducts";
import ScrollToTop from "@/components/ui_component/ScrollToTop/ScrolToTop";
import React from "react";

const page = () => {
  return (
    <div>
      <Banner></Banner>

      <FlashSale></FlashSale>
      <Categories></Categories>
      <VendorProducts></VendorProducts>
      <ScrollToTop></ScrollToTop>
    </div>
  );
};

export default page;
