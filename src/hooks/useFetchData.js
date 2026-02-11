import { useState, useEffect, useCallback } from "react";
import { mapCategory } from "../utils/map-category";
export const useFetchData = (category, API_KEY, count = 20) => {
  const [data, setData] = useState(() => {
    try {
      const cached = localStorage.getItem(`wallpapers_${category}`);
      return cached ? JSON.parse(cached) : [];
    } catch (e) {
      console.error("Failed to parse cached data:", e);
      return [];
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);
  const searchCategory = mapCategory(category);
  const specialCategories = ["latest", "trending", "most popular"];
  const isSpecialCategory = specialCategories.includes(
    searchCategory.toLowerCase(),
  );
  const latestQueries = ["moon", "sunset", "universe"];
  const fetchData = useCallback(async () => {
    const cacheKey = `wallpapers_${searchCategory}`;
    const cachedData = localStorage.getItem(cacheKey);
    const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
    const cacheDuration = 24 * 60 * 60 * 1000;
    if (
      cachedData &&
      cacheTimestamp &&
      Date.now() - parseInt(cacheTimestamp) < cacheDuration
    ) {
      try {
        setData(JSON.parse(cachedData));
        return;
      } catch (e) {
        console.error("Cache corrupted, fetching fresh data...", e);
      }
    }
    const queries = isSpecialCategory ? latestQueries : [searchCategory];
    const perPage = count;
    const orderBy =
      isSpecialCategory &&
      (searchCategory.toLowerCase() === "latest" ||
        searchCategory.toLowerCase() === "trending")
        ? "latest"
        : "relevant";
    setLoading(true);
    setError(null);
    try {
      const responses = await Promise.all(
        queries.map(async (query) => {
          const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
            query,
          )}&per_page=${perPage}&page=1&order_by=${orderBy}&client_id=${API_KEY}`;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Network error: ${response.statusText}`);
          }
          return response.json();
        }),
      );
      let allPhotos = [];
      if (isSpecialCategory) {
        responses.forEach((result) => {
          if (result.results) {
            allPhotos = [...allPhotos, ...result.results];
          }
        });
        const uniquePhotosMap = new Map();
        allPhotos.forEach((photo) => {
          if (!uniquePhotosMap.has(photo.id)) {
            uniquePhotosMap.set(photo.id, photo);
          }
        });
        allPhotos = Array.from(uniquePhotosMap.values());
        let sortedPhotos = allPhotos;
        switch (searchCategory.toLowerCase()) {
          case "latest":
            sortedPhotos = allPhotos.sort(
              (a, b) => new Date(b.created_at) - new Date(a.created_at),
            );
            break;
          case "trending":
          case "most popular":
            sortedPhotos = allPhotos.sort((a, b) => b.likes - a.likes);
            break;
        }
        allPhotos = sortedPhotos.slice(0, count);
      } else {
        if (responses[0] && responses[0].results) {
          allPhotos = responses[0].results.slice(0, count);
        }
      }
      localStorage.setItem(cacheKey, JSON.stringify(allPhotos));
      localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());
      setData(allPhotos);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [searchCategory, API_KEY, isSpecialCategory, count]);
  useEffect(() => {
    fetchData();
  }, [fetchData, refetchTrigger]);
  const refetch = useCallback(() => {
    localStorage.removeItem(`wallpapers_${searchCategory}`);
    localStorage.removeItem(`wallpapers_${searchCategory}_timestamp`);
    setRefetchTrigger((prev) => prev + 1);
  }, [searchCategory]);
  return { data, loading, error, refetch };
};