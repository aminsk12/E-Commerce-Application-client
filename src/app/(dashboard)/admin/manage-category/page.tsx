import config from "@/config";
import React, { Suspense } from "react";
import CategorieAction from "./CategoryAction";

const fetchCategories = async () => {
  const res = await fetch(`${config.backendApi}/category`, {
    cache: "no-store",
    next: { tags: ["all-category"] },
  });
  const data = await res.json();
  return data.data;
};

const CategoriesContent = async () => {
  const categories = await fetchCategories();
  return <CategorieAction categories={categories} />;
};

const Page = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Manage Categories</h1>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-solid border-gray-900"></div>
          </div>
        }
      >
        <CategoriesContent />
      </Suspense>
    </div>
  );
};

export default Page;
