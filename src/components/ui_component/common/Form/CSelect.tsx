import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";

interface SelectProps {
  name: string;
  label: string;
  text: string;
  options: {
    value: string;
    label: string;
  }[];
}

const CSelect = ({ name, label, text, options }: SelectProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={{ required: `This field is required.` }}
        render={({ field }) => (
          <Select
            disabled={options.length <= 0}
            onValueChange={field.onChange}
            value={field.value}
          >
            <SelectTrigger>
              <SelectValue placeholder={text} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {options.map((option, i) => (
                  <SelectItem key={i} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm ">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default CSelect;
