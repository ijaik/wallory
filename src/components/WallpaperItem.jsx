import React, { useState } from "react";
import { useNavigate } from "react-router";
import SkeletonLoading from "./SkeletonLoading";
const WallpaperItem = ({ photo }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const handleImageLoad = () => {
    setIsLoading(false);
  };
  const handleClick = () => {
    navigate("/customize", { state: { photo } });
  };
  const aspectRatio = (photo.height / photo.width) * 100;
  return (
    <div className="w-full inline-block p-[5px] sm:cursor-pointer group">
      <div className="relative" style={{ paddingTop: `${aspectRatio}%` }}>
        <SkeletonLoading isLoading={isLoading}>
          <img
            src={photo.urls.regular}
            alt={photo.alt_description || `Wallpaper by ${photo.user.name}`}
            className={`absolute inset-0 w-full h-full object-cover rounded-[10px] transition-opacity duration-250 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
            loading="lazy"
            onLoad={handleImageLoad}
            onClick={handleClick}
          />
        </SkeletonLoading>
      </div>
    </div>
  );
};
export default React.memo(WallpaperItem);