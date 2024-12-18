"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface SearchSortFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortCriteria: string;
  onSortChange: (value: string) => void;
  categoryId: string;
  onCategoryChange: (value: string) => void;
  categoryOptions: { categoryId: string; name: string }[];
}

const SearchSortFilter: React.FC<SearchSortFilterProps> = ({
  searchTerm,
  onSearchChange,
  sortCriteria,
  onSortChange,
  categoryId,
  onCategoryChange,
  categoryOptions,
}) => {
  return (
    <div className="flex flex-wrap justify-between mt-3">
      {/* Search */}
      <div className="flex mb-3 w-full max-w-sm items-center space-x-2">
        <Input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Filter and Sort */}
      <div className="mb-3 flex-wrap flex gap-2">
        {/* Filter */}
        <Select
          value={categoryId || "reset"}
          onValueChange={(value) =>
            onCategoryChange(value === "reset" ? "" : value)
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="reset">All Categories</SelectItem>
              {categoryOptions.map((option) => (
                <SelectItem key={option.categoryId} value={option.categoryId}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select
          value={sortCriteria || "reset"}
          onValueChange={(value) =>
            onSortChange(value === "reset" ? "" : value)
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="reset">Default</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating-asc">Rating: Low to High</SelectItem>
              <SelectItem value="rating-desc">Rating: High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchSortFilter;
