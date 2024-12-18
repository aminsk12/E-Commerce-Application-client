"use client";

import ChangePass from "@/components/ui_component/common/ChangePassword/ChangePass";
import { useGetUserDashboard } from "@/hooks/dashboard"; // Assuming you have this hook implemented
import React from "react";
import {
  FaShoppingCart,
  FaDollarSign,
  FaPercentage,
  FaClipboardList,
  FaMoneyCheckAlt,
  FaUserFriends,
  FaStar,
} from "react-icons/fa";

const Dashboard = () => {
  const { data, isLoading, error } = useGetUserDashboard();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-semibold text-gray-500">
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-semibold text-red-500">
          Error loading dashboard: {error.message}
        </div>
      </div>
    );
  }

  const dashboardData = data?.data;

  return (
    <div>
      <div className="dashboard-container p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Customer Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Orders */}
          <div className="card bg-white text-gray-800 shadow-md rounded-lg p-6 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Total Orders</h2>
              <FaShoppingCart className="text-3xl text-blue-500" />
            </div>
            <p className="text-4xl font-bold mt-4">
              {dashboardData?.totalOrders || 0}
            </p>
          </div>

          {/* Total Spent */}
          <div className="card bg-white text-gray-800 shadow-md rounded-lg p-6 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Total Spent</h2>
              <FaDollarSign className="text-3xl text-yellow-500" />
            </div>
            <p className="text-4xl font-bold mt-4">
              ${dashboardData?.totalSpent?.toFixed(2) || "0.00"}
            </p>
          </div>

          {/* Total Discounts */}
          <div className="card bg-white text-gray-800 shadow-md rounded-lg p-6 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Total Discounts</h2>
              <FaPercentage className="text-3xl text-purple-500" />
            </div>
            <p className="text-4xl font-bold mt-4">
              ${dashboardData?.totalDiscounts?.toFixed(2) || "0.00"}
            </p>
          </div>

          {/* Orders by Status */}
          <div className="card bg-white text-gray-800 shadow-md rounded-lg p-6 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Orders by Status</h2>
              <FaClipboardList className="text-3xl text-gray-500" />
            </div>
            <ul className="mt-4 space-y-2">
              {dashboardData?.orderStatus &&
                Object.entries(dashboardData.orderStatus).map(
                  ([status, count]) => (
                    <li
                      key={status}
                      className="flex justify-between text-lg text-gray-600"
                    >
                      <span className="capitalize">{status}</span>
                      <span>{count}</span>
                    </li>
                  )
                )}
            </ul>
          </div>

          {/* Payment Status */}
          <div className="card bg-white text-gray-800 shadow-md rounded-lg p-6 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Payment Status</h2>
              <FaMoneyCheckAlt className="text-3xl text-gray-500" />
            </div>
            <ul className="mt-4 space-y-2">
              {dashboardData?.paymentStatus &&
                Object.entries(dashboardData.paymentStatus).map(
                  ([status, count]) => (
                    <li
                      key={status}
                      className="flex justify-between text-lg text-gray-600"
                    >
                      <span className="capitalize">{status}</span>
                      <span>{count}</span>
                    </li>
                  )
                )}
            </ul>
          </div>

          {/* Followers */}
          <div className="card bg-white text-gray-800 shadow-md rounded-lg p-6 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Total Shops Followed</h2>
              <FaUserFriends className="text-3xl text-pink-500" />
            </div>
            <p className="text-4xl font-bold mt-4">
              {dashboardData?.totalFollowers || 0}
            </p>
          </div>

          {/* Reviews */}
          <div className="card bg-white text-gray-800 shadow-md rounded-lg p-6 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Total Reviews</h2>
              <FaStar className="text-3xl text-teal-500" />
            </div>
            <p className="text-4xl font-bold mt-4">
              {dashboardData?.totalReviews || 0}
            </p>
          </div>
        </div>
      </div>
      <div>
        <ChangePass></ChangePass>
      </div>
    </div>
  );
};

export default Dashboard;
