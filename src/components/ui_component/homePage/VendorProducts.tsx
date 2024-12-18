/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import AllProduct from "../../../components/ui_component/common/AllProduct/AllProduct";
import { useAllProduct } from "@/hooks/product.hook";
import { useAllCategory } from "@/hooks/category.hook";
import { useFilterSortSearch } from "@/lib/utils/hook/useFilterSortSearch";
import SearchSortFilter from "@/components/ui_component/common/searchSortFilter/SearchSortFilter";
import { IProduct } from "@/interface/product.interface";
import { throttle } from "lodash";

const Products = () => {
  const {
    searchTerm,
    setSearchTerm,
    sortCriteria,
    setSortCriteria,
    categoryId,
    setCategoryId,
    debouncedSearchTerm,
  } = useFilterSortSearch();

  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { data: { data: categories } = {} } = useAllCategory();
  const { data, isLoading, promise } = useAllProduct(
    debouncedSearchTerm || "",
    categoryId || "",
    sortCriteria || "",
    page || 1
  );
  console.log(promise);
  useEffect(() => {
    setAllProducts([]);
  }, [categoryId, sortCriteria]);

  useEffect(() => {
    if (data?.data) {
      setAllProducts((prevProducts) => [
        ...prevProducts,
        ...data.data.filter(
          (newProduct) =>
            !prevProducts.some(
              (prevProduct) => prevProduct.productId === newProduct.productId
            )
        ),
      ]);
      setHasMore((data?.meta?.page || 1) < (data?.meta?.totalPage || 1));
    }
  }, [data]);

  const handleScroll = throttle(() => {
    const nearBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 200;

    if (nearBottom && !isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, 200);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasMore]);

  return (
    <div className="py-4">
      <p className="text-2xl font-semibold ms-2">Products For You</p>
      <div className="sm:mt-0 px-2">
        <SearchSortFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortCriteria={sortCriteria}
          onSortChange={setSortCriteria}
          categoryId={categoryId}
          onCategoryChange={setCategoryId}
          categoryOptions={categories || []}
        />
      </div>

      <div className="mt-4">
        {isLoading && allProducts.length === 0 && (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4  border-solid border-gray-900"></div>
          </div>
        )}

        {allProducts.length > 0 ? (
          <>
            <AllProduct data={allProducts} />
            {isLoading && (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4  border-solid border-gray-900"></div>
              </div>
            )}
            {!hasMore && !isLoading && (
              <div className="text-center text-gray-500 mt-8">
                No more products to load.
              </div>
            )}
          </>
        ) : (
          !isLoading && (
            <div className="text-center text-gray-500 mt-8">
              No products found. Try adjusting your filters.
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Products;
