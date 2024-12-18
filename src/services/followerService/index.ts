/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/axiosInstance/axiosInstance";
import { revalidateTag } from "next/cache";

const handleError = (error: any) => {
  throw new Error(error?.response?.data?.message || error?.message || error);
};

export const newFollow = async (id: string) => {
  try {
    const res = await axiosInstance.post(`/follower/new-follow/${id}`);
    revalidateTag("single-shop");
    return res?.data;
  } catch (error: any) {
    handleError(error);
  }
};

export const removeFollow = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/follower/remove-follow/${id}`);
    revalidateTag("single-shop");
    return res?.data;
  } catch (error: any) {
    handleError(error);
  }
};
