/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import ShopDetails from "./ShopDetails";

const page = async ({ params }: { params: any }) => {
  const { id } = await params;

  return (
    <>
      <ShopDetails id={id}></ShopDetails>
    </>
  );
};

export default page;
