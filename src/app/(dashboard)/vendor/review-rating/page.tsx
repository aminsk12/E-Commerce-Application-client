"use client";
import { useGetReviewByShop } from "@/hooks/rating.hook";
import React, { useState } from "react";
import ReviewTable from "./ReviewTable";
import { DynamicPagination } from "@/components/ui_component/common/Pagination/DynamicPagination";

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetReviewByShop(currentPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    // Fetch new data here based on the page
  };
  return (
    <div>
      <div className="min-h-[85vh]">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-solid border-gray-900"></div>
          </div>
        ) : (
          <> {data && <ReviewTable reviews={data?.data}></ReviewTable>}</>
        )}
      </div>
      <div className="flex justify-center mt-5">
        {data?.meta && data && (
          <DynamicPagination
            meta={data.meta}
            onPageChange={handlePageChange}
          ></DynamicPagination>
        )}
      </div>
    </div>
  );
};

export default Page;
