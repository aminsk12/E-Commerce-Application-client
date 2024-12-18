/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useFormContext } from "react-hook-form";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import React from "react";
export const CRating = ({ label }: { label: string }) => {
  const { control } = useFormContext();
  return (
    <div>
      <label htmlFor="rating" className="label-text ">
        {label}
      </label>
      <Controller
        name="rating"
        control={control}
        render={({ field, fieldState }) => (
          <>
            <Rating {...field} style={{ maxWidth: 160 }}></Rating>
            {fieldState.error && (
              <span className="text-red-500 text-sm">
                {fieldState.error.message}
              </span>
            )}
          </>
        )}
      />
    </div>
  );
};
