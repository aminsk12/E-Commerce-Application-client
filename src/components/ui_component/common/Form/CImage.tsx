"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React, { useState, ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";

interface InputProps {
  name: string;
  label: string;
  required?: boolean;
}

const CImageInput = ({ name, label, required = true }: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [previews, setPreviews] = useState<string[]>([]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPreviews: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result) {
            newPreviews.push(reader.result as string);
            if (newPreviews.length === files.length) {
              setPreviews(newPreviews); // Update the state once all files are loaded
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input
        type="file"
        multiple
        {...register(name, {
          required: required ? "This field is required." : false,
        })}
        onChange={(event) => {
          register(name).onChange?.(event);
          handleImageChange(event);
        }}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm">
          {errors[name]?.message?.toString()}
        </p>
      )}
      <div className="mt-2 grid grid-cols-3 gap-2">
        {previews.map((preview, index) => (
          <Image
            key={index}
            width={200}
            height={200}
            src={preview}
            alt={`Selected preview ${index + 1}`}
            className="mt-2 max-h-48 rounded-lg shadow"
          />
        ))}
      </div>
    </div>
  );
};

export default CImageInput;
