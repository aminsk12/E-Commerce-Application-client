"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IApiResponse } from "@/interface/apiResponse.interface";
import { IOrder } from "@/interface/order.interface";
import { queryClient } from "@/providers/Provider";
import {
  getAllOrder,
  getPendingOrder,
  getSigleOrder,
  getSigleUserAllOrder,
  makePayment,
  updateOrder,
} from "@/services/order";
import { getVendorSingleShopOrders } from "@/services/shopService";
import { useMutation, useQuery } from "@tanstack/react-query";

// Helper function to invalidate multiple queries
const invalidateQueries = (queryKeys: string[]) => {
  queryKeys.forEach((key) =>
    queryClient.invalidateQueries({ queryKey: [key] })
  );
};

// Mutation for making an order
export const useMakeOrder = () =>
  useMutation<any, Error, any>({
    mutationFn: makePayment,
    onSuccess: () =>
      invalidateQueries(["user-all-order", "all-order", "pending-order"]),
  });

// Query for fetching a single user's all orders with filters
export const useSigleUserAllOrder = (currentPage: number, status: string) =>
  useQuery<IApiResponse<IOrder[]>>({
    queryKey: ["user-all-order", currentPage, status],
    queryFn: () => getSigleUserAllOrder(currentPage, status),
  });

// Query for fetching a single order
export const useSingleOrder = (id: string) =>
  useQuery<IApiResponse<IOrder>>({
    enabled: !!id,
    queryKey: ["user-single-order", id],
    queryFn: () => getSigleOrder(id),
  });

// Query for fetching all orders
export const useAllOrder = (page: number) =>
  useQuery<IApiResponse<IOrder[]>>({
    queryKey: ["all-order", page],
    queryFn: () => getAllOrder(page),
  });

// Mutation for updating an order
export const useUpdateOrder = () =>
  useMutation<any, Error, string>({
    mutationFn: updateOrder,
    onSuccess: () =>
      invalidateQueries([
        "user-all-order",
        "all-order",
        "pending-order",
        "vendorSingleShopOrder",
        "getUserDashboard",
      ]),
  });

// Query for fetching vendor's single shop orders with filters
export const useVendorSingleShopOrders = (status: string, page: number) =>
  useQuery<IApiResponse<IOrder[]>>({
    queryKey: ["vendorSingleShopOrder", status, page],
    queryFn: () => getVendorSingleShopOrders(status, page),
  });

// Query for fetching pending orders
export const usePendingOrder = (page: number) =>
  useQuery<IApiResponse<IOrder[]>>({
    queryKey: ["pending-order", page],
    queryFn: () => getPendingOrder(page),
  });
