import React from "react";

const loading = () => {
  return (
    <div className="flex justify-center items-center h-40">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-solid border-gray-900">
        {""}
      </div>
    </div>
  );
};

export default loading;
