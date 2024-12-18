"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import bg1 from "@/assets/bg1.png";
import bg2 from "@/assets/bg2.png";
const Banner = () => {
  return (
    <div className="mb-5">
      <Carousel showThumbs={false} className="">
        <Image width={1000} height={100} alt="" src={bg1} />

        <Image width={1000} height={200} alt="" src={bg2} />
      </Carousel>
    </div>
  );
};

export default Banner;
