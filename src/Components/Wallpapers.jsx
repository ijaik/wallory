import React, { useState, useEffect, useCallback, useRef } from "react";
import WallpaperItem from "./WallpaperItem";
const Wallpapers = React.memo(({ category }) => {
  const [dataByCategory, setDataByCategory] = useState({});
  const [pageByCategory, setPageByCategory] = useState({});
  const [hasMoreByCategory, setHasMoreByCategory] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
  const observer = useRef();
  const categoryMap = {
    Moone: "Moon",
    Sonne: "Sunset",
  };
  const searchCategory = categoryMap[category] || category;
  const isLatest = searchCategory.toLowerCase() === "latest";
  const latestQueries = ["moon", "sunsets", "abstract", "artworks"];
  useEffect(() => {
    const queries = isLatest ? latestQueries : [searchCategory];
    setDataByCategory((prev) => {
      const updated = { ...prev };
      if (isLatest && !updated["Latest"]) updated["Latest"] = [];
      queries.forEach((query) => {
        if (!updated[query]) updated[query] = [];
      });
      return updated;
    });
    setPageByCategory((prev) => {
      const updated = { ...prev };
      queries.forEach((query) => {
        if (!updated[query]) updated[query] = 1;
      });
      return updated;
    });
    setHasMoreByCategory((prev) => {
      const updated = { ...prev };
      queries.forEach((query) => {
        if (updated[query] === undefined) updated[query] = true;
      });
      return updated;
    });
  }, [searchCategory, isLatest]);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  useEffect(() => {
    const fetchData = async () => {
      const queries = isLatest ? latestQueries : [searchCategory];
      setLoading(true);
      setError(null);
      try {
        for (const query of queries) {
          await delay(500);
          const currentPage = pageByCategory[query] || 1;
          if (dataByCategory[query]?.length > 0 && currentPage === 1) continue;
          const perPage = currentPage === 1 ? 16 : 8;
          const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
            query
          )}&per_page=${perPage}&page=${currentPage}&client_id=${API_KEY}`;
          const response = await fetch(url);
          if (!response.ok)
            throw new Error(`Network error: ${response.statusText}`);
          const result = await response.json();
          setDataByCategory((prev) => {
            const updated = { ...prev };
            const existingIds = new Set(
              (updated[query] || []).map((photo) => photo.id)
            );
            const newPhotos = result.results.filter(
              (photo) => !existingIds.has(photo.id)
            );
            updated[query] = [...(updated[query] || []), ...newPhotos];
            if (isLatest) {
              const latestIds = new Set(
                (updated["Latest"] || []).map((photo) => photo.id)
              );
              updated["Latest"] = [
                ...(updated["Latest"] || []),
                ...newPhotos.filter((photo) => !latestIds.has(photo.id)),
              ];
            }
            return updated;
          });
          setHasMoreByCategory((prev) => ({
            ...prev,
            [query]: result.results.length >= perPage,
          }));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchCategory, pageByCategory, API_KEY, isLatest]);
  const lastWallpaperRef = useCallback(
    (node) => {
      const queries = isLatest ? latestQueries : [searchCategory];
      if (loading || queries.every((query) => !hasMoreByCategory[query]))
        return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setPageByCategory((prev) => {
              const updated = { ...prev };
              queries.forEach((query) => {
                if (hasMoreByCategory[query]) {
                  updated[query] = (updated[query] || 1) + 1;
                }
              });
              return updated;
            });
          }
        },
        { rootMargin: "200px" }
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasMoreByCategory, searchCategory, isLatest]
  );
  const handleDownload = useCallback(
    async (photoId, photoDescription) => {
      try {
        const downloadUrl = `https://api.unsplash.com/photos/${photoId}/download?client_id=${API_KEY}`;
        const response = await fetch(downloadUrl);
        if (!response.ok) {
          throw new Error("Failed to initiate download");
        }
        const data = await response.json();
        if (!data.url) {
          throw new Error("No download URL found in response");
        }
        const imageUrl = data.url;
        const imageResponse = await fetch(imageUrl);
        if (!imageResponse.ok) {
          throw new Error("Failed to download image");
        }
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
  const currentData = isLatest
    ? dataByCategory["Latest"] || []
    : dataByCategory[searchCategory] || [];
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
            onClick={() => setPageByCategory((prev) => ({ ...prev }))}
            className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="columns-1 gap-x-[0px] gap-y-[0px] p-[5px] w-full sm:columns-2 md:columns-3 lg:columns-4">
          {currentData.length > 0 ? (
            currentData.map((photo, index) => {
              if (index === currentData.length - 1) {
                return (
                  <div ref={lastWallpaperRef} key={photo.id}>
                    <WallpaperItem photo={photo} onDownload={handleDownload} />
                  </div>
                );
              }
              return (
                <WallpaperItem
                  key={photo.id}
                  photo={photo}
                  onDownload={handleDownload}
                />
              );
            })
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-300 w-full">
              No wallpapers found.
            </p>
          )}
        </div>
      )}
      {loading && currentData.length > 0 && (
        <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-black">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500 dark:text-gray-300">
            Loading wallpapers...
          </p>
        </div>
      )}
      <hr />
    </>
  );
});
export default Wallpapers;