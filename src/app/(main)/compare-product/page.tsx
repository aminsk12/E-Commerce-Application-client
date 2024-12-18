"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import {
  clearComparison,
  removeProductFromComparison,
} from "@/redux/features/compareSlice/compareSlice";
import { Button } from "@/components/ui/button";

const ComparisonPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedProducts = useAppSelector(
    (state: RootState) => state.compareSlice.selectedProducts
  );

  const handleClear = () => {
    dispatch(clearComparison());
  };

  const handleRemove = (productId: string) => {
    dispatch(removeProductFromComparison(productId));
  };

  if (selectedProducts.length === 0) {
    return (
      <p className="text-center mt-10">No products selected for comparison.</p>
    );
  }

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold text-center mb-5">Comparison Table</h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300 w-full text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2">Attribute</th>
              {selectedProducts.map((product) => (
                <th
                  key={product.productId}
                  className="border border-gray-300 p-2"
                >
                  <div className="flex flex-col items-center">
                    {product.name}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleRemove(product.productId)}
                      className="mt-1"
                    >
                      Remove
                    </Button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">Price</td>
              {selectedProducts.map((product) => (
                <td
                  key={product.productId}
                  className="border border-gray-300 p-2"
                >
                  {product.price} Tk
                </td>
              ))}
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Category</td>
              {selectedProducts.map((product) => (
                <td
                  key={product.productId}
                  className="border border-gray-300 p-2"
                >
                  {product.category.name}
                </td>
              ))}
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Average Rating</td>
              {selectedProducts.map((product) => (
                <td
                  key={product.productId}
                  className="border border-gray-300 p-2"
                >
                  {product.averageRating || 0}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <Button onClick={handleClear} className="mt-5">
        Clear Comparison
      </Button>
    </div>
  );
};

export default ComparisonPage;
