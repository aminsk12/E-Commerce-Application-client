import { Checkbox } from "@/components/ui/checkbox"; // Ensure Checkbox supports React Hook Form integration
import { Label } from "@/components/ui/label";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";

const CGroupCheckbox = () => {
  const { control } = useFormContext(); // Get the control object from the form context

  return (
    <div>
      <Label className="">Select Size</Label>
      <div className="flex gap-4 ">
        <div className="flex items-center space-x-2">
          <Controller
            name="sizes"
            control={control}
            render={({ field }) => (
              <>
                <Checkbox
                  checked={field.value?.includes("S") || false}
                  onCheckedChange={(checked) => {
                    const newValue = checked
                      ? [...(field.value || []), "S"]
                      : (field.value || []).filter(
                          (item: string) => item !== "S"
                        );
                    field.onChange(newValue);
                  }}
                />
                <label
                  htmlFor="S"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  S
                </label>
              </>
            )}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Controller
            name="sizes"
            control={control}
            render={({ field }) => (
              <>
                <Checkbox
                  checked={field.value?.includes("M") || false}
                  onCheckedChange={(checked) => {
                    const newValue = checked
                      ? [...(field.value || []), "M"]
                      : (field.value || []).filter(
                          (item: string) => item !== "M"
                        );
                    field.onChange(newValue);
                  }}
                />
                <label
                  htmlFor="M"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  M
                </label>
              </>
            )}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Controller
            name="sizes"
            control={control}
            render={({ field }) => (
              <>
                <Checkbox
                  checked={field.value?.includes("L") || false}
                  onCheckedChange={(checked) => {
                    const newValue = checked
                      ? [...(field.value || []), "L"]
                      : (field.value || []).filter(
                          (item: string) => item !== "L"
                        );
                    field.onChange(newValue);
                  }}
                />
                <label
                  htmlFor="L"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  L
                </label>
              </>
            )}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Controller
            name="sizes"
            control={control}
            render={({ field }) => (
              <>
                <Checkbox
                  checked={field.value?.includes("XL") || false}
                  onCheckedChange={(checked) => {
                    const newValue = checked
                      ? [...(field.value || []), "XL"]
                      : (field.value || []).filter(
                          (item: string) => item !== "XL"
                        );
                    field.onChange(newValue);
                  }}
                />
                <label
                  htmlFor="XL"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  XL
                </label>
              </>
            )}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Controller
            name="sizes"
            control={control}
            render={({ field }) => (
              <>
                <Checkbox
                  checked={field.value?.includes("XXL") || false}
                  onCheckedChange={(checked) => {
                    const newValue = checked
                      ? [...(field.value || []), "XXL"]
                      : (field.value || []).filter(
                          (item: string) => item !== "XXL"
                        );
                    field.onChange(newValue);
                  }}
                />
                <label
                  htmlFor="XXL"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  XXL
                </label>
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default CGroupCheckbox;
