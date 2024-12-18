"use client";
import React, { useContext, useEffect, useState } from "react";
import AllProduct from "../../../components/ui_component/common/AllProduct/AllProduct";
import { useAllProduct2 } from "@/hooks/product.hook";
import { useAllCategory2 } from "@/hooks/category.hook";
import { useFilterSortSearch } from "@/lib/utils/hook/useFilterSortSearch";
import SearchSortFilter from "@/components/ui_component/common/searchSortFilter/SearchSortFilter";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setCategoryId as setCId } from "@/redux/features/cartSlice/cartSlice";
import { AuthContext } from "@/providers/AuthProvider";
import { DynamicPagination } from "@/components/ui_component/common/Pagination/DynamicPagination";

const Page = () => {
  const {
    searchTerm,
    setSearchTerm,
    sortCriteria,
    setSortCriteria,
    categoryId,
    setCategoryId,
    debouncedSearchTerm,
  } = useFilterSortSearch();

  const userData = useContext(AuthContext);
  const { data: { data: category } = {} } = useAllCategory2();
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching } = useAllProduct2(
    debouncedSearchTerm || "",
    categoryId || "",
    sortCriteria || "",
    page || 1
  );

  const dispatch = useAppDispatch();
  const { categoryId: storedCategoryId } = useAppSelector(
    (state) => state.cartSlice
  );
  const { selectedProducts } = useAppSelector((state) => state.compareSlice);

  useEffect(() => {
    if (storedCategoryId) {
      dispatch(setCId(""));
      setCategoryId(storedCategoryId);
    }
  }, [storedCategoryId, setCategoryId, dispatch]);

  console.log(isFetching, isLoading);
  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-solid border-gray-900"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="sm:mt-0 px-2">
        <SearchSortFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortCriteria={sortCriteria}
          onSortChange={setSortCriteria}
          categoryId={categoryId}
          onCategoryChange={setCategoryId}
          categoryOptions={category || []}
        />
        <div className="flex gap-2 justify-between  mb-5 ">
          {userData?.user?.role === "CUSTOMER" &&
            selectedProducts.length > 0 && (
              <div className="flex  justify-end me-4">
                <Link
                  href="/compare-product"
                  className="text-sm flex items-center gap-1 hover:underline underline-offset-2"
                >
                  <span>Compared Product</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            )}
          {userData?.user?.role === "CUSTOMER" && (
            <div className="flex  justify-end me-4">
              <Link
                href="/recent-products"
                className="text-sm flex items-center gap-1 hover:underline underline-offset-2"
              >
                <span>Recently Viewed</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          )}
        </div>
      </div>

      <div>
        {data?.data?.length ? (
          <>
            <div className="min-h-[75vh]">
              <AllProduct data={data.data} />
            </div>
            {data?.meta && (
              <DynamicPagination onPageChange={setPage} meta={data.meta} />
            )}
          </>
        ) : (
          <p className="font-medium text-zinc-500 text-center mt-10">
            No Product to Display
          </p>
        )}
      </div>
    </div>
  );
};

export default Page;
