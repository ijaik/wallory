import { useState, useEffect, useCallback } from "react";
export const useFetchData = (category, API_KEY) => {
  const [data, setData] = useState(() => {
    const cached = localStorage.getItem(`wallpapers_${category}`);
    return cached ? JSON.parse(cached) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);
  const categoryMap = {
    Moone: "Moon",
    Sonne: "Sunset",
  };
  const searchCategory = categoryMap[category] || category;
  const specialCategories = ["latest", "trending", "most popular"];
  const isSpecialCategory = specialCategories.includes(
    searchCategory.toLowerCase()
  );
  const latestQueries = ["flower", "moon", "sunsets", "universe"];
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
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
      setData(JSON.parse(cachedData));
      return;
    }
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

        if (isSpecialCategory) {
          allPhotos = [...allPhotos, ...result.results];
        } else {
          allPhotos = result.results;
        }
      }
      if (isSpecialCategory) {
        let sortedPhotos = allPhotos;
        switch (searchCategory.toLowerCase()) {
          case "latest":
            sortedPhotos = allPhotos.sort(
              (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );
            break;
          case "trending":
          case "most popular":
            sortedPhotos = allPhotos.sort((a, b) => b.likes - a.likes);
            break;
        }
        allPhotos = sortedPhotos.slice(0, 20);
      }
      localStorage.setItem(cacheKey, JSON.stringify(allPhotos));
      localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());
      setData(allPhotos);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [searchCategory, API_KEY, isSpecialCategory]);
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