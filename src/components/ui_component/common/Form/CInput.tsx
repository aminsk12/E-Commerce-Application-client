"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useFormContext } from "react-hook-form";

interface InputProps {
  name: string;
  label: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "date"
    | "file"
    | "datetime-local";
  placeHolder?: string;
  required?: boolean;
}

const CInput = ({
  type,
  name,
  label,
  placeHolder,
  required = true,
}: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid w-full items-center gap-1.5">
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input
        placeholder={placeHolder}
        type={type}
        {...register(name, {
          required: required ? "This field is required." : false,
        })}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm ">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default CInput;
