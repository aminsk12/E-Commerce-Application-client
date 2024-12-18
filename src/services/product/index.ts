"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/lib/axiosInstance/axiosInstance";
import { FieldValues } from "react-hook-form";

const handleError = (error: any) => {
  throw new Error(error?.response?.data?.message || error?.message || error);
};

// Add Product
export const addProduct = async (data: FieldValues) => {
  try {
    const res = await axiosInstance.post(`/product/add-product`, data);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

// Clone Product
export const cloneProduct = async (data: FieldValues) => {
  try {
    const res = await axiosInstance.post(`/product/clone-product`, data);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

// Fetch All Products
export const allProduct = async ({
  searchTerm,
  categoryId,
  sortCriteria: sort,
  page,
}: {
  searchTerm: string;
  categoryId: string;
  sortCriteria: string;
  page: number;
}) => {
  try {
    const res = await axiosInstance.get(`/product`, {
      params: { searchTerm, categoryId, sort, page, limit: 12 },
    });
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

// Fetch Single Product
export const singleProduct = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/product/${id}`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

// Update Product
export const updateProduct = async ({
  data,
  id,
}: {
  data: FieldValues;
  id: string;
}) => {
  try {
    const res = await axiosInstance.patch(`/product/${id}`, data);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

// Delete Product
export const deleteProduct = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/product/${id}`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

// Fetch Flash Products
export const flashProduct = async () => {
  try {
    const res = await axiosInstance.post(`/product/flash-sale`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};
