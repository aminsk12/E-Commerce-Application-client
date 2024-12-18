"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import CForm from "@/components/ui_component/common/Form/CForm";
import CButton from "@/components/ui_component/common/Form/CButton";
import CInput from "@/components/ui_component/common/Form/CInput";
import CSelect from "@/components/ui_component/common/Form/CSelect";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useCreateCupon } from "@/hooks/Cupon.hook";

import { useVendorShop } from "@/hooks/shop.hook"; // Fetch vendor shops

const AddCoupon = () => {
  const { mutate, isPending } = useCreateCupon();
  const { data: shopData } = useVendorShop();

  const onFormSubmit = async (data: FieldValues) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Coupon created successfully.");
      },
      onError: () => {
        toast.error("Failed to create coupon. Please try again.");
      },
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create Coupon</CardTitle>
        <CardDescription>Add a new coupon for your shop.</CardDescription>
      </CardHeader>

      <CardContent>
        <CForm onFromSubmit={onFormSubmit}>
          <div className="grid gap-3">
            {/* Coupon Code */}
            <CInput
              name="code"
              label="Coupon Code"
              type="text"
              placeHolder="Enter coupon code"
            ></CInput>

            {/* Discount */}
            <CInput
              name="discount"
              label="Discount (%)"
              type="number"
              placeHolder="Enter discount percentage"
            ></CInput>

            {/* Expiration Date */}
            <CInput
              name="expiresAt"
              label="Expiration Date"
              type="datetime-local"
              placeHolder="Select expiration date (optional)"
            ></CInput>

            {/* Shop Selection */}
            <CSelect
              options={
                shopData?.data
                  ? shopData?.data.map((shop) => ({
                      label: shop.name,
                      value: shop.shopId,
                    }))
                  : []
              }
              label="Select Shop"
              text="Select shop"
              name="shopId"
            ></CSelect>

            {/* Submit Button */}
            <CButton
              isPending={isPending}
              type="submit"
              text="Create Coupon"
            ></CButton>
          </div>
        </CForm>
      </CardContent>
    </Card>
  );
};

export default AddCoupon;
