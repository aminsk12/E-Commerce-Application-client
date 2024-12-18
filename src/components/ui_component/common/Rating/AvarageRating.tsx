"use client";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";

const AvarageRating = ({
  rating,
  width,
}: {
  rating: number;
  width: number;
}) => {
  return <Rating style={{ maxWidth: width }} value={rating} readOnly />;
};

export default AvarageRating;
