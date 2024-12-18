/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axiosInstance from "@/lib/axiosInstance/axiosInstance";

const handleError = (error: any) => {
  throw new Error(error?.response?.data?.message || error?.message || error);
};

export const makePayment = async (data: any) => {
  try {
    const res = await axiosInstance.post(`/order/make-payment`, data);

    return res?.data;
  } catch (error: any) {
    handleError(error);
  }
};

export const getSigleUserAllOrder = async (
  currentPage: number,
  status: string
) => {
  try {
    const res = await axiosInstance.get(`/order/my-order`, {
      params: {
        page: currentPage,
        status,
      },
    });

    return res?.data;
  } catch (error: any) {
    handleError(error);
  }
};

export const getSigleOrder = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/order/single-order/${id}`);

    return res?.data;
  } catch (error: any) {
    handleError(error);
  }
};

export const getAllOrder = async (page: number) => {
  try {
    const res = await axiosInstance.get(`/order/all-orders/`, {
      params: {
        page,
      },
    });

    return res?.data;
  } catch (error: any) {
    handleError(error);
  }
};
export const getPendingOrder = async (page: number) => {
  try {
    const res = await axiosInstance.get(`/order/pending-order`, {
      params: {
        page,
      },
    });

    return res?.data;
  } catch (error: any) {
    handleError(error);
  }
};

export const updateOrder = async (id: string) => {
  try {
    const res = await axiosInstance.patch(`/order/update/${id}`);

    return res?.data;
  } catch (error: any) {
    handleError(error);
  }
};
