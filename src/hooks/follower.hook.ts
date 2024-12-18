"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { queryClient } from "@/providers/Provider";
import { newFollow, removeFollow } from "@/services/followerService";
import { useMutation } from "@tanstack/react-query";

// Helper function to invalidate related queries
const invalidateFollowQueries = () => {
  queryClient.invalidateQueries({ queryKey: ["vendorShopSingle"] });
  queryClient.invalidateQueries({ queryKey: ["singleVendorWithAllProduct"] });
};

// Mutation for following a shop
export const useFollowShop = () =>
  useMutation<any, Error, string>({
    mutationFn: newFollow,
    onSuccess: invalidateFollowQueries,
  });

// Mutation for unfollowing a shop
export const useUnfollowShop = () =>
  useMutation<any, Error, string>({
    mutationFn: removeFollow,
    onSuccess: invalidateFollowQueries,
  });
