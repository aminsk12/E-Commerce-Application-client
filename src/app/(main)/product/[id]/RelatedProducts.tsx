"use client";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";

import Link from "next/link";
import { IProduct } from "@/interface/product.interface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const RelatedProducts = ({ product }: { product: IProduct[] }) => {
  return (
    <div className="my-5 px-1 container mx-auto">
      <Swiper
        className=""
        slidesPerView={2}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          440: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          550: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          988: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
        }}
        modules={[Pagination]}
      >
        {product?.map((data) => (
          <SwiperSlide
            key={data?.productId}
            className="grid justify-items-center   "
          >
            <Card className="w-32 h-fit m-0 p-0">
              <CardHeader className=" mb-0 pb-0  px-0 py-0">
                <div className="flex w-full h-32  p-3 justify-center items-center rounded-2xl overflow-hidden">
                  <Image
                    className="w-full rounded-lg object-cover h-full"
                    width={200}
                    height={100}
                    src={data.images[0]}
                    alt=""
                  ></Image>
                </div>
                <CardTitle className="text-sm px-2">
                  <Link
                    className="hover:underline"
                    href={`/product/${data.productId}`}
                  >
                    {" "}
                    {data?.name.length > 17 ? (
                      <>{data.name.slice(0, 14)}..</>
                    ) : (
                      data.name
                    )}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs pt-0 mt-0 px-2 pb-2 ">
                <p className="text-base font-medium">{data?.price} Tk</p>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RelatedProducts;
