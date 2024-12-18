"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks";
import { setCategoryId } from "@/redux/features/cartSlice/cartSlice";
import { useAllCategory } from "@/hooks/category.hook";

const Categories = () => {
  const { data, isLoading } = useAllCategory(); // Assuming `isLoading` is available
  const dispatch = useAppDispatch();

  const buttonStyles =
    "w-36 h-10 md:min-w-40 flex items-center justify-center rounded-full bg-black md:h-14 text-white font-medium";
  const hoverEffect = "hover:scale-95 duration-500";

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-solid border-gray-900"></div>
      </div>
    );
  }

  if (!data?.data?.length) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500 text-lg font-medium">No Categories</p>
      </div>
    );
  }

  return (
    <div className="mb-8 px-1 mt-5 sm:mt-0">
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        pagination={{ clickable: true }}
        breakpoints={{
          440: { slidesPerView: 3, spaceBetween: 20 },
          550: { slidesPerView: 3, spaceBetween: 20 },
          768: { slidesPerView: 4, spaceBetween: 30 },
          988: { slidesPerView: 5, spaceBetween: 30 },
          1024: { slidesPerView: 6, spaceBetween: 10 },
        }}
        modules={[Pagination]}
      >
        {data.data.map(({ categoryId, name }) => (
          <SwiperSlide key={categoryId}>
            <Link
              href="/product"
              onClick={() => dispatch(setCategoryId(categoryId))}
              className={`w-full ${hoverEffect} flex justify-center`}
            >
              <div className={buttonStyles}>{name}</div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Categories;
