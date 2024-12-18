/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ProductDetails from "./ProductDetails";

const ProductDetailsPage = async ({ params }: { params: any }) => {
  const { id } = await params;

  return <div>{id && <ProductDetails id={id}></ProductDetails>}</div>;
};

export default ProductDetailsPage;
