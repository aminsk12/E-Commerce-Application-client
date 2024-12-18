/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/axiosInstance/axiosInstance";
import { FieldValues } from "react-hook-form";

// Centralized error handler
const handleError = (error: any): never => {
  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "An unexpected error occurred";
  throw new Error(errorMessage);
};

// Create a new coupon
export const createCupon = async (dataValue: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(`/cupon/create-cupon`, dataValue);
    return data;
  } catch (error: any) {
    handleError(error);
  }
};

// Fetch coupons for a specific shop
export const getShopCupon = async (shopId: string) => {
  try {
    const { data } = await axiosInstance.get(`/cupon/get-cupon/${shopId}`);
    return data;
  } catch (error: any) {
    handleError(error);
  }
};
