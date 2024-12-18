/* eslint-disable @typescript-eslint/no-explicit-any */
import OrderDetails from "@/components/ui_component/common/Order/OrderDetails";
import React from "react";

const page = async ({ params }: { params: any }) => {
  const { id } = await params;

  return (
    <div>
      <OrderDetails id={id}></OrderDetails>
    </div>
  );
};

export default page;
