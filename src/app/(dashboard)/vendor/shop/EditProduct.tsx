"use client";
import CButton from "@/components/ui_component/common/Form/CButton";
import CForm from "@/components/ui_component/common/Form/CForm";
import CGroupCheckbox from "@/components/ui_component/common/Form/CGroupCheckbox";
import CImageInput from "@/components/ui_component/common/Form/CImage";
import CInput from "@/components/ui_component/common/Form/CInput";
import { Modalbox } from "@/components/ui_component/common/modal/Modalbox";
import { useUpdateProduct } from "@/hooks/product.hook";
import { IProduct } from "@/interface/product.interface";
import { filterAndConvertFields } from "@/lib/utils/filterEmptyObject";
import { uploadImagesToCloudinary } from "@/lib/utils/uploadImageArray";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const EditProduct = ({ product }: { product: IProduct }) => {
  const { mutate, isPending } = useUpdateProduct();
  const onFromSubmit = async (data: FieldValues) => {
    const fiterData = filterAndConvertFields(data, [
      "discounts",
      "price",
      "stock",
    ]);
    const { images: imageFiles, ...otherData } = fiterData;
    let imageUrl = null;
    if (!!fiterData) {
      if (imageFiles) {
        imageUrl = await uploadImagesToCloudinary(imageFiles);
      }
      mutate(
        {
          data: { ...otherData, ...(imageUrl && { images: imageUrl }) },
          id: product.productId,
        },
        {
          onSuccess: () => {
            toast.success("Product updated.");
          },
          onError: () => {
            toast.error("Something went wrong! Try again.");
          },
        }
      );
    } else {
      toast.error("Something went wrong! Try again.");
    }
  };
  return (
    <Modalbox
      size="icon"
      variant="outline"
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
          <CImageInput
            required={false}
            name="images"
            label="Product Image"
          ></CImageInput>
          <CInput
            required={false}
            placeHolder={product.name}
            name="name"
            label="Product Name"
            type="text"
          ></CInput>
          <CInput
            required={false}
            placeHolder={product.description}
            name="description"
            label="Description"
            type="text"
          ></CInput>
          <CInput
            required={false}
            placeHolder={product.discounts.toString()}
            name="discounts"
            label="Discounts"
            type="number"
          ></CInput>
          <CInput
            required={false}
            placeHolder={product.price.toString()}
            name="price"
            label="Price"
            type="number"
          ></CInput>
          <CInput
            required={false}
            placeHolder={product.stock.toString()}
            name="stock"
            label="Quantity"
            type="number"
          ></CInput>
          <CGroupCheckbox></CGroupCheckbox>
          <CButton isPending={isPending} text="Update" type="submit"></CButton>
        </div>
      </CForm>
    </Modalbox>
  );
};

export default EditProduct;
