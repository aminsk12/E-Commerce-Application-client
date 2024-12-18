/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/axiosInstance/axiosInstance";
import { FieldValues } from "react-hook-form";

const handleError = (error: any) => {
  throw new Error(error?.response?.data?.message || error?.message || error);
};

export const addReview = async (data: FieldValues) => {
  try {
    const res = await axiosInstance.post(`/rating/add-rating`, {
      data: data,
    });
    return res?.data;
  } catch (error: any) {
    handleError(error);
  }
};

export const replyReview = async (data: {
  id: string;
  vendorReply: string;
}) => {
  try {
    const res = await axiosInstance.patch(`/rating/reply`, data); // Adjusted payload structure
    return res?.data;
  } catch (error: any) {
    handleError(error);
  }
};

export const getReviewbyShop = async (page: number) => {
  try {
    const res = await axiosInstance.get(`/rating/get-rating-by-shop`, {
      params: { page },
    });
    return res?.data;
  } catch (error: any) {
    handleError(error);
  }
};
