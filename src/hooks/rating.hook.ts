"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IApiResponse } from "@/interface/apiResponse.interface";
import { IReview } from "@/interface/review.interface";
import { queryClient } from "@/providers/Provider";
import {
  addReview,
  getReviewbyShop,
  replyReview,
} from "@/services/ratingService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";

// Helper function to invalidate queries
const invalidateQueries = (queryKeys: string[]) => {
  queryKeys.forEach((key) =>
    queryClient.invalidateQueries({ queryKey: [key] })
  );
};

export const useAddRating = () =>
  useMutation<any, Error, FieldValues>({
    mutationFn: addReview,
    onSuccess: () => invalidateQueries(["user-single-order"]),
  });

export const useReplyRating = () =>
  useMutation<any, Error, { id: string; vendorReply: string }>({
    mutationFn: replyReview,
    onSuccess: () => invalidateQueries(["get-rating-by-shop"]),
  });

export const useGetReviewByShop = (page: number) =>
  useQuery<IApiResponse<IReview[]>>({
    queryKey: ["get-rating-by-shop", page],
    queryFn: () => getReviewbyShop(page),
  });
