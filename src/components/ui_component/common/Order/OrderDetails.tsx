"use client";
import { useSingleOrder } from "@/hooks/order.hook";
import Image from "next/image";
import React, { useContext } from "react";
import ReviewAction from "./ReviewAction";
import { AuthContext } from "@/providers/AuthProvider";

const OrderDetails = ({ id }: { id: string }) => {
  // Fetch the order details using the custom hook

  const authData = useContext(AuthContext);
  const {
    data: { data: orderDetails } = {},
    isLoading,
    error,
  } = useSingleOrder(id);
  console.log(orderDetails);
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        Error loading order details.
      </div>
    );

  if (!orderDetails)
    return (
      <div className="flex justify-center items-center h-screen">
        No order found.
      </div>
    );

  const {
    total,
    discounts,
    subTotal,
    status,
    paymentStatus,
    transactionId,
    createdAt,
    updatedAt,
    items,
  } = orderDetails;

  return (
    <div className="container mx-auto p-4">
      {/* Order Summary */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-3xl font-bold mb-4">Order Summary</h2>
        <div className="grid gap-4">
          <p>
            <strong className="text-gray-700">Order ID:</strong> {id}
          </p>
          <p>
            <strong className="text-gray-700">Status:</strong>{" "}
            <span className="text-blue-600">{status}</span>
          </p>
          <p>
            <strong className="text-gray-700">Payment Status:</strong>{" "}
            <span className="text-green-600">{paymentStatus}</span>
          </p>
          <p>
            <strong className="text-gray-700">Transaction ID:</strong>{" "}
            {transactionId}
          </p>
          <p>
            <strong className="text-gray-700">Total:</strong>{" "}
            <span className="text-xl font-semibold text-red-600">${total}</span>
          </p>
          <p>
            <strong className="text-gray-700">Discounts:</strong>{" "}
            <span className="text-lg text-red-500">${discounts}</span>
          </p>
          <p>
            <strong className="text-gray-700">Subtotal:</strong> ${subTotal}
          </p>
          <p>
            <strong className="text-gray-700">Created At:</strong>{" "}
            {new Date(createdAt).toLocaleString()}
          </p>
          <p>
            <strong className="text-gray-700">Updated At:</strong>{" "}
            {new Date(updatedAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-4">Order Items</h2>
        {items?.length > 0 ? (
          <div className="mt-4 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center border-b pb-4"
              >
                <div className="w-full md:w-24 md:h-24 flex-shrink-0">
                  <Image
                    width={200}
                    height={200}
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="mt-4 md:mt-0 md:ml-4 flex-1 text-center md:text-left">
                  <p className="text-lg font-semibold">{item.product.name}</p>
                  {item.size && (
                    <p className="text-gray-500">Size: {item.size}</p>
                  )}
                  <p className="text-gray-500">Quantity: {item.quantity}</p>
                  <p className="text-gray-500">
                    Price: <span className="text-green-600">${item.price}</span>
                  </p>
                  <p className="text-gray-500">
                    <span className="font-medium">Shop: {item.shop?.name}</span>
                  </p>
                </div>
                {authData?.user?.role == "CUSTOMER" &&
                  status == "DELIVERED" && (
                    <div className="mt-2 md:mt-0">
                      {item.Review.map((info) => info.customer?.email).includes(
                        authData.user.userEmail
                      ) ? (
                        <p className="bg-green-500 py-1 px-2 rounded-lg font-medium text-white">
                          Review Given
                        </p>
                      ) : (
                        <ReviewAction
                          productId={item.productId}
                          orderItemId={item.id}
                        ></ReviewAction>
                      )}
                    </div>
                  )}
              </div>
            ))}
          </div>
        ) : (
          <p>No items in this order.</p>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
