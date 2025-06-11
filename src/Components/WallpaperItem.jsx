import React, { useState } from "react";
import SkeletonLoading from "./SkeletonLoading";
const WallpaperItem = ({ photo, onDownload }) => {
  const [isLoading, setIsLoading] = useState(true);
  const handleImageLoad = () => {
    setIsLoading(false);
  };
  const aspectRatio = (photo.height / photo.width) * 100;
  return (
    <div className="w-full inline-block p-[5px] sm:cursor-pointer group">
      <div className="relative" style={{ paddingTop: `${aspectRatio}%` }}>
        <SkeletonLoading isLoading={isLoading}>
          <img
            src={photo.urls.small}
            alt={photo.alt_description || `Wallpaper by ${photo.user.name}`}
            className={`absolute inset-0 w-full h-full object-cover rounded-[10px] ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
            loading="lazy"
            onLoad={handleImageLoad}
            onClick={() => onDownload(photo.id, photo.alt_description)}
          />
        </SkeletonLoading>
        <div className="absolute bottom-7 left-7 right-7 bg-white text-black dark:bg-black bg-opacity-60 dark:text-white text-sm p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Photo by{" "}
          <a
            href={photo.user.links.html}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-indigo-500"
          >
            {photo.user.name}
          </a>{" "}
          on{" "}
          <a
            href="https://unsplash.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-indigo-500"
          >
            Unsplash
          </a>
        </div>
      </div>
    </div>
  );
};
export default React.memo(WallpaperItem);