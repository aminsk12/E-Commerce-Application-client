"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createUser,
  loginUser,
  resetPass,
  setNewPass,
} from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";

export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues, unknown>({
    mutationFn: (data: any) => createUser(data),
  });
};

export const useUserlogin = () => {
  return useMutation<any, Error, FieldValues, unknown>({
    mutationFn: (data: any) => loginUser(data),
  });
};

export const useResetPass = () => {
  return useMutation<any, Error, { email: string }>({
    mutationKey: ["RESET_PASS"],
    mutationFn: async (userEmail) => await resetPass(userEmail),
  });
};

export const useSetNewPass = () => {
  return useMutation<any, Error, { token: string; password: string }>({
    mutationKey: ["NEW_PASS"],
    mutationFn: async (data) => await setNewPass(data),
  });
};
