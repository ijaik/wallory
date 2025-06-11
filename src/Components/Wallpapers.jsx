import React, { useState, useEffect, useCallback } from "react";
import WallpaperItem from "./WallpaperItem";
const Wallpapers = React.memo(({ category }) => {
  const [dataByCategory, setDataByCategory] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);
  const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
  const categoryMap = {
    Moone: "Moon",
    Sonne: "Sunset",
  };
  const searchCategory = categoryMap[category] || category;
  const specialCategories = ["latest", "trending", "most popular"];
  const isSpecialCategory = specialCategories.includes(
    searchCategory.toLowerCase()
  );
  const latestQueries = ["moon", "sunsets", "flower", "universe"];
  useEffect(() => {
    setDataByCategory((prev) => ({ ...prev, [searchCategory]: [] }));
  }, [searchCategory]);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  useEffect(() => {
    const fetchData = async () => {
      const queries = isSpecialCategory ? latestQueries : [searchCategory];
      const perPage = isSpecialCategory ? 40 : 20;
      const orderBy =
        isSpecialCategory &&
        (searchCategory.toLowerCase() === "latest" ||
          searchCategory.toLowerCase() === "trending")
          ? "latest"
          : "relevant";
      let allPhotos = [];
      setLoading(true);
      setError(null);
      try {
        for (const query of queries) {
          await delay(500);
          const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
            query
          )}&per_page=${perPage}&page=1&order_by=${orderBy}&client_id=${API_KEY}`;
          const response = await fetch(url);
          if (!response.ok)
            throw new Error(`Network error: ${response.statusText}`);
          const result = await response.json();
          const fetchedPhotos = result.results;

          if (isSpecialCategory) {
            allPhotos = [...allPhotos, ...fetchedPhotos];
          } else {
            setDataByCategory((prev) => ({ ...prev, [query]: fetchedPhotos }));
          }
        }
        if (isSpecialCategory) {
          let sortedPhotos;
          switch (searchCategory.toLowerCase()) {
            case "latest":
              sortedPhotos = allPhotos.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
              );
              break;
            case "trending":
              sortedPhotos = allPhotos.sort((a, b) => b.likes - a.likes);
              break;
            case "most popular":
              sortedPhotos = allPhotos.sort((a, b) => b.likes - a.likes);
              break;
          }
          const topPhotos = sortedPhotos.slice(0, 16);
          setDataByCategory((prev) => ({
            ...prev,
            [searchCategory]: topPhotos,
          }));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchCategory, refetchTrigger, API_KEY, isSpecialCategory]);
  const handleDownload = useCallback(
    async (photoId, photoDescription) => {
      try {
        const downloadUrl = `https://api.unsplash.com/photos/${photoId}/download?client_id=${API_KEY}`;
        const response = await fetch(downloadUrl);
        if (!response.ok) throw new Error("Failed to initiate download");
        const data = await response.json();
        if (!data.url) throw new Error("No download URL found in response");
        const imageUrl = data.url;
        const imageResponse = await fetch(imageUrl);
        if (!imageResponse.ok) throw new Error("Failed to download image");
        const blob = await imageResponse.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${photoDescription || `wallpaper-${Date.now()}`}.jpg`;
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
  const currentData = dataByCategory[searchCategory] || [];
  return (
    <>
      {loading && currentData.length === 0 ? (
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
            onClick={() => setRefetchTrigger((prev) => prev + 1)}
            className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="columns-2 gap-x-[0px] gap-y-[0px] p-[5px] w-full sm:columns-3 md:columns-4 lg:columns-5">
          {currentData.length > 0 ? (
            currentData.map((photo) => (
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