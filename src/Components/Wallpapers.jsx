import React, { useCallback } from "react";
import WallpaperItem from "./WallpaperItem";
import { useFetchData } from "../Hook/useFetchData";
const Wallpapers = React.memo(({ category }) => {
  const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
  const { data, loading, error, refetch } = useFetchData(category, API_KEY);
  const handleDownload = useCallback(
    async (photoId, photoDescription) => {
      try {
        const downloadUrl = `https://api.unsplash.com/photos/${photoId}/download?client_id=${API_KEY}`;
        const response = await fetch(downloadUrl);
        if (!response.ok) throw new Error("Failed to initiate download");
        const data = await response.json();
        if (!data.url) throw new Error("No download URL found in response");
        const imageResponse = await fetch(data.url);
        if (!imageResponse.ok) throw new Error("Failed to download image");
        const blob = await imageResponse.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${photoDescription || `${photoId}`}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (err) {
        console.error("Download error:", err);
      }
    },
    [API_KEY]
  );
  return (
    <>
      {loading && data.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-black">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500 dark:text-gray-300">
            Loading wallpapers...
          </p>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 dark:text-red-400 py-6">
          <p>{error}</p>
          <button
            onClick={refetch}
            className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="columns-1 gap-x-[0px] gap-y-[0px] p-[5px] w-full sm:columns-2 md:columns-3 lg:columns-4">
          {data.length > 0 ? (
            data.map((photo) => (
              <WallpaperItem
                key={photo.id}
                photo={photo}
                onDownload={handleDownload}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-300 w-full">
              No wallpapers found.
            </p>
          )}
        </div>
      )}
      <hr />
    </>
  );
});
export default Wallpapers;