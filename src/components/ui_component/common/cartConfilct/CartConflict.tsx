"use client";
import { replaceCart, retainCart } from "@/redux/features/cartSlice/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React from "react";
import { Modalbox } from "../modal/Modalbox";
import { DialogClose } from "@radix-ui/react-dialog";

const CartConflict = () => {
  const { showVendorConflictDialog } = useAppSelector(
    (state) => state.cartSlice
  );
  const dispatch = useAppDispatch();
  const handleReplaceCart = () => {
    dispatch(replaceCart());
  };

  const handleRetainCart = () => {
    dispatch(retainCart());
  };
  return (
    <div>
      {" "}
      <>
        {showVendorConflictDialog && (
          <Modalbox
            isOpen={true}
            title="You have items from another vendor in your cart. What would you
             like to do?"
          >
            <div className="grid gap-2">
              <DialogClose
                className=" py-2 text-white bg-zinc-950"
                onClick={handleReplaceCart}
              >
                Replace Cart
              </DialogClose>
              <DialogClose
                className=" py-2 text-white bg-zinc-950"
                onClick={handleRetainCart}
              >
                Retain Current Cart
              </DialogClose>
            </div>
          </Modalbox>
        )}
      </>
    </div>
  );
};

export default CartConflict;
