import React, { useState } from "react";
import SkeletonLoading from "./SkeletonLoading";
function Card({ image, title, onClick }) {
  const [isLoading, setIsLoading] = useState(true);
  const handleImageLoad = () => {
    setIsLoading(false);
  };
  return (
    <div
      onClick={onClick}
      className="m-2.5 grow shrink basis-[250px] flex justify-center items-center relative w-[500px] h-[250px] rounded-[10px] overflow-hidden sm:cursor-pointer"
    >
      <SkeletonLoading isLoading={isLoading}>
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse dark:bg-gray-600">
            <div className="w-full h-full bg-linear-to-r from-gray-200 dark:from-gray-600 via-gray-300 dark:via-gray-700 to-gray-200 dark:to-gray-600 animate-shimmer" />
          </div>
        )}
        <img
          className={`w-full h-full object-cover rounded brightness-50 absolute object-center ${
            isLoading ? "opacity-0" : "opacity-100"
          } transition-opacity duration-300`}
          src={image}
          alt={title}
          onLoad={handleImageLoad}
        />
      </SkeletonLoading>
      <h1
        className={`absolute z-10 text-[31.25px] font-['Agbalumo',cursive] dark:text-white ${
          isLoading ? "text-black" : "text-white"
        }`}
      >
        {title}
      </h1>
    </div>
  );
}
export default React.memo(Card);