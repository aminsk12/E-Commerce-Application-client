/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axiosInstance from "@/lib/axiosInstance/axiosInstance";

// Centralized error handler
const handleError = (error: any): never => {
  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "An unexpected error occurred";
  throw new Error(errorMessage);
};

export const getUserDashboar = async () => {
  try {
    const { data } = await axiosInstance.get(`/dashboard/user`);
    return data;
  } catch (error: any) {
    handleError(error);
  }
};

export const getAdminDashboar = async () => {
  try {
    const { data } = await axiosInstance.get(`/dashboard/admin`);
    return data;
  } catch (error: any) {
    handleError(error);
  }
};

export const getVendorDashboar = async () => {
  try {
    const { data } = await axiosInstance.get(`/dashboard/vendor`);
    return data;
  } catch (error: any) {
    handleError(error);
  }
};
