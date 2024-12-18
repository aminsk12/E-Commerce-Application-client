"use client";
import { useGetAllUser } from "@/hooks/user.hook";
import React, { useState } from "react";
import UserTable from "./UserTable";
import SearchInput from "@/components/ui_component/common/searchSortFilter/SearchInput";
import useDebounce from "@/lib/utils/useDebounce";
import FilterSortSelect from "@/components/ui_component/common/searchSortFilter/FilterSortSelect";
import { DynamicPagination } from "@/components/ui_component/common/Pagination/DynamicPagination";

const ManageUser = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isBlocked, setIsblock] = useState("");

  const searchTermText = useDebounce(searchTerm, 500);

  const { data, isLoading } = useGetAllUser(
    searchTermText,
    isBlocked,
    currentPage
  );
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <div className="flex flex-wrap justify-between">
        <SearchInput
          placeholder="Search by Email"
          value={searchTerm}
          onChange={setSearchTerm}
        ></SearchInput>
        <div className="flex items-center gap-2">
          <p>Filter By Status</p>
          <FilterSortSelect
            onChange={setIsblock}
            value={isBlocked}
            options={[
              { label: "Blocked User", value: "true" },
              { label: "Active User", value: "false" },
            ]}
          ></FilterSortSelect>
        </div>
      </div>
      <div className=" min-h-[78vh] lg:min-h-[80vh] mt-3">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-solid border-gray-900"></div>
          </div>
        ) : (
          <> {data?.data && <UserTable users={data?.data}></UserTable>}</>
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

export default ManageUser;
