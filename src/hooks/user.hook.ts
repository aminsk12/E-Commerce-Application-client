"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IApiResponse } from "@/interface/apiResponse.interface";
import { IUser } from "@/interface/user.interface";
import { queryClient } from "@/providers/Provider";
import { blockUser, deleteUser, getAllUser, updatePass } from "@/services/user";
import { useMutation, useQuery } from "@tanstack/react-query";

// Fetch all users with optional filters
export const useGetAllUser = (search: string, block: string, page: number) =>
  useQuery<IApiResponse<IUser[]>>({
    queryKey: ["get-all-userdata", search, block, page],
    queryFn: () => getAllUser(search, block, page),
  });

// Helper function to invalidate "get-all-userdata" query
const invalidateAllUserData = () =>
  queryClient.invalidateQueries({ queryKey: ["get-all-userdata"] });

// Block a user mutation
export const useBlockUser = () =>
  useMutation<any, Error, string>({
    mutationFn: blockUser,
    onSuccess: invalidateAllUserData,
  });

// Delete a user mutation
export const useDeleteUser = () =>
  useMutation<any, Error, string>({
    mutationFn: deleteUser,
    onSuccess: invalidateAllUserData,
  });

// Update password mutation
export const useUpdatePass = () =>
  useMutation<any, Error, { password: string }>({
    mutationFn: updatePass,
  });
