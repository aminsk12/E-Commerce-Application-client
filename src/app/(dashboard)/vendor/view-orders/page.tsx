"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import OrderTable from "@/components/ui_component/common/Order/OrderTable";
import { DynamicPagination } from "@/components/ui_component/common/Pagination/DynamicPagination";
import { useVendorSingleShopOrders } from "@/hooks/order.hook";

import React, { useState } from "react";

const Page = () => {
  const [page, setPage] = useState(1);
  const [delivaryStatus, setDelivaryStatus] = useState("PENDING");
  const { data, isLoading } = useVendorSingleShopOrders(delivaryStatus, page);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div className="">
      <div className="mb-5 mt-2 ">
        <Select
          value={delivaryStatus || "reset"}
          onValueChange={(value) =>
            setDelivaryStatus(value === "reset" ? "" : value)
          }
        >
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Choose Your Shop" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"reset"}>All</SelectItem>
            <SelectItem value={"PENDING"}>PENDING</SelectItem>
            <SelectItem value={"ONGOING"}>ONGOING</SelectItem>
            <SelectItem value={"DELIVERED"}>DELIVERED</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-solid border-gray-900"></div>
        </div>
      ) : (
        <div className="min-h-[85vh]">
          {!!data?.data && <OrderTable orderData={data.data} />}
        </div>
      )}

      <div className="mt-2">
        {data?.meta && (
          <DynamicPagination
            onPageChange={handlePageChange}
            meta={data?.meta}
          ></DynamicPagination>
        )}
      </div>
    </div>
  );
};

export default Page;
