import CForm from "@/components/ui_component/common/Form/CForm";
import CInput from "@/components/ui_component/common/Form/CInput";
import { Modalbox } from "@/components/ui_component/common/modal/Modalbox";
import { useUpdateCategory } from "@/hooks/category.hook";
import { DialogClose } from "@radix-ui/react-dialog";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const EditCategory = ({ id }: { id: string }) => {
  const { mutate: updateCategory, isPending } = useUpdateCategory();
  const onFromSubmit = async (data: FieldValues) => {
    updateCategory(
      { id, name: data.name },
      {
        onSuccess: () => {
          toast.success("Category updated.");
        },
        onError: () => {
          toast.error("Something went wrong! Try again.");
        },
      }
    );
  };
  return (
    <Modalbox
      title="Edit Product Data"
      btncss="hover:text-green-500"
      btnIcon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      }
    >
      <CForm onFromSubmit={onFromSubmit}>
        <div className="grid gap-4">
          <CInput
            required={false}
            placeHolder={"Name"}
            name="name"
            label="Category Name"
            type="text"
          ></CInput>

          <DialogClose
            disabled={isPending}
            type="submit"
            className="flex bg-primary py-2 rounded-lg justify-center text-primary-foreground shadow hover:bg-primary/90"
          >
            Update
          </DialogClose>
        </div>
      </CForm>
    </Modalbox>
  );
};

export default EditCategory;
