import React from "react";
const SkeletonLoading = ({ isLoading, children, className = "" }) => {
  return (
    <>
      {isLoading && (
        <div
          className={`absolute inset-0 bg-gray-200 animate-pulse dark:bg-gray-600 ${className}`}
          aria-hidden="true"
        >
          <div className="w-full h-full bg-linear-to-r from-gray-200 dark:from-gray-600 via-gray-300 dark:via-gray-700 to-gray-200 dark:to-gray-600 animate-shimmer" />
        </div>
      )}
      {children}
    </>
  );
};
export default React.memo(SkeletonLoading);