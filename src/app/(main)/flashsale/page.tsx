"use client";
import React from "react";
import {
  Card,
  CardContent,
  //   CardDescription,
  //   CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useFlashProduct } from "@/hooks/product.hook";
const FlashSale = () => {
  const { data: { data: product } = {} } = useFlashProduct();
  return (
    <div>
      <p className="bg-black mx-2 rounded-md text-white text-center py-2 text-2xl font-medium underline  mt-1">
        Flash Sale Products
      </p>
      <div className="grid mt-2 justify-items-center xxs:grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 2xl:grid-cols-10 gap-2   mx-auto  overflow-hidden h-[470px]  gap-y-5  sm:h-[239px]">
        {product?.map((productData, i) => (
          <Card key={i} className="w-32 h-fit m-0 p-0">
            <CardHeader className=" mb-0 pb-0  px-0 py-0">
              <div className="flex w-full h-32  p-3 justify-center items-center rounded-2xl overflow-hidden">
                <Image
                  className="w-full rounded-lg object-cover h-full"
                  width={200}
                  height={100}
                  src={productData.product.images[0]}
                  alt=""
                ></Image>
              </div>
              <CardTitle className="text-sm px-2">
                <Link href={`/product/${productData.productId}`}>
                  {productData.product.name.length > 11
                    ? `${productData.product.name.slice(0, 11)}...`
                    : productData.product.name}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs pt-0 mt-0 px-2 pb-2 ">
              <p className="text-base font-medium">
                {productData.product.price -
                  (productData.product.price * productData.discount) / 100}{" "}
                Tk
              </p>
              <p className="flex gap-4 ">
                <span className="line-through">
                  {productData.product.price} Tk
                </span>
                <span>{productData.discount}%</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FlashSale;
