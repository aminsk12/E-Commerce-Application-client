import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { IReview } from "@/interface/review.interface";
import AvarageRating from "@/components/ui_component/common/Rating/AvarageRating";

import Reply from "./Reply";

interface ReviewTableProps {
  reviews: IReview[];
}

const ReviewTable: React.FC<ReviewTableProps> = ({ reviews }) => {
  return (
    <>
      {reviews && (
        <Table>
          <TableCaption>Review List</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Product Image</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Your Reply</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review.reviewId}>
                <TableCell>
                  <Image
                    width={100}
                    height={100}
                    src={
                      !!review?.product?.images.length
                        ? review?.product?.images[0]
                        : ""
                    } // Display the first image
                    alt={review?.product?.name || ""}
                    className="w-16 h-16 object-cover rounded"
                  />
                </TableCell>
                <TableCell>{review?.product?.name}</TableCell>
                <TableCell>{review?.customer?.name}</TableCell>
                <TableCell>
                  <span> {review?.comment}</span>
                  <div className="mt-1">
                    <AvarageRating
                      width={60}
                      rating={review?.rating}
                    ></AvarageRating>
                  </div>
                </TableCell>
                <TableCell>{review?.vendorReply || "No Reply Yet"}</TableCell>
                <TableCell>
                  {review.vendorReply ? (
                    <p className="bg-zinc-950 text-white font-semibold p-2 rounded-md text-center">
                      Replied
                    </p>
                  ) : (
                    <Reply id={review.reviewId}></Reply>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default ReviewTable;
