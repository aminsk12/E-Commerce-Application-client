/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { jwtDecode } from "jwt-decode";
import axiosInstance from "@/lib/axiosInstance/axiosInstance";
import config from "@/config";
import { cookies } from "next/headers";

// Constants
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 24 * 60, // 60 days
};

// Centralized error handler
const handleError = (error: any): never => {
  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "An unexpected error occurred";
  throw new Error(errorMessage);
};

// Login user and set access token cookie
export const loginUser = async (userData: {
  email: string;
  password: string;
}) => {
  try {
    const { data } = await axiosInstance.post(`/auth/user-login`, userData);
    const token = data?.data?.token;

    if (token) {
      (await cookies()).set("accessToken", token, COOKIE_OPTIONS);
    }

    return data;
  } catch (error: any) {
    handleError(error);
  }
};

// Create a new user and set access token cookie
export const createUser = async (userData: any) => {
  try {
    const { data } = await axiosInstance.post(
      `${config.backendApi}/user/create-user`,
      userData
    );
    const token = data?.data;

    if (token) {
      (await cookies()).set("accessToken", token, COOKIE_OPTIONS);
    }

    return data;
  } catch (error: any) {
    handleError(error);
  }
};

// Get the currently logged-in user by decoding the access token
export const getCurrentUser = async () => {
  const token = (await cookies()).get("accessToken")?.value;
  let decode = null;

  if (token) {
    decode = await jwtDecode(token as string);
  }
  return await decode;
};

// Set a new password
export const setNewPass = async (passData: {
  token: string;
  password: string;
}) => {
  try {
    const { data } = await axiosInstance.patch("/user/set-pass", passData);
    return data;
  } catch (error: any) {
    handleError(error);
  }
};

// Reset password using email
export const resetPass = async (userEmail: { email: string }) => {
  try {
    const { data } = await axiosInstance.post("/auth/reset", userEmail);
    return data;
  } catch (error: any) {
    handleError(error);
  }
};

// Log out the user by deleting the access token cookie
export const logout = async () => {
  try {
    (await cookies()).delete("accessToken");
  } catch (error: any) {
    handleError(error);
  }
};
