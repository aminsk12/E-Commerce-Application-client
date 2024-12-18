import { DialogClose } from "@/components/ui/dialog";
import { Modalbox } from "@/components/ui_component/common/modal/Modalbox";
import { useCloneProduct } from "@/hooks/product.hook";
import { IProduct } from "@/interface/product.interface";
import React from "react";
import { toast } from "sonner";

const CloneModal = ({ data }: { data: Partial<IProduct> }) => {
  const { mutate } = useCloneProduct();

  const cloneProductData = (data: Partial<IProduct>) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Product cloned.");
      },
      onError: () => {
        toast.error("Something went wrong! Try again.");
      },
    });
  };

  return (
    <Modalbox
      size="icon"
      variant="outline"
      btncss="hover:text-red-500"
      title="Are you sure?"
      btnIcon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
          />
        </svg>
      }
    >
      <div className="flex justify-between">
        <DialogClose
          onClick={() =>
            cloneProductData({
              name: data.name,
              price: data.price,
              stock: data.stock,
              categoryId: data.categoryId,
              shopId: data.shopId,
              sizes: data.sizes,
              images: data.images,
              discounts: data.discounts,
              description: data.description,
            })
          }
        >
          <p className=" bg-red-500 text-white rounded-md w-20 py-2">Yes</p>
        </DialogClose>
        <DialogClose>
          <p className="bg-gray-950 text-white rounded-md w-20 py-2">No</p>
        </DialogClose>
      </div>
    </Modalbox>
  );
};

export default CloneModal;
