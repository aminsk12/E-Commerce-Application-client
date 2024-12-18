"use client";
import { IApiResponse } from "@/interface/apiResponse.interface";
import { IUserDashboardData } from "@/interface/dashboard.interface";
import {
  getAdminDashboar,
  getUserDashboar,
  getVendorDashboar,
} from "@/services/dashboardService";
import { useQuery } from "@tanstack/react-query";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const useGetUserDashboard = () => {
  return useQuery<IApiResponse<IUserDashboardData>>({
    queryKey: ["getUserDashboard"],
    queryFn: () => getUserDashboar(),
  });
};

export const useGetVendorDashboard = () => {
  return useQuery<IApiResponse<any>>({
    queryKey: ["getVendorDashboard"],
    queryFn: () => getVendorDashboar(),
  });
};

export const useGetAdminDashboard = () => {
  return useQuery<IApiResponse<any>>({
    queryKey: ["getAdminDashboard"],
    queryFn: () => getAdminDashboar(),
  });
};
