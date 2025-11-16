import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router";
import { gsap } from "gsap";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import { FiInfo } from "react-icons/fi";
const Customize = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [photo, setPhoto] = useState(null);
  const [filter, setFilter] = useState("none");
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const filters = [
    { name: "None", value: "none" },
    { name: "Grayscale", value: "grayscale(100%)" },
    { name: "Sepia", value: "sepia(100%)" },
    { name: "Bright", value: "brightness(150%)" },
    { name: "Contrast", value: "contrast(150%)" },
    { name: "Saturate", value: "saturate(150%)" },
    { name: "Hue Rotate", value: "hue-rotate(90deg)" },
  ];
  useEffect(() => {
    if (location.state?.photo) {
      setPhoto(location.state.photo);
    } else {
      setError("No photo selected. Redirecting to Explore...");
      setTimeout(() => navigate("/explore"), 2000);
    }
  }, [location.state, navigate]);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".customize-container",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
      gsap.fromTo(
        ".canvas-area",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out", delay: 0.2 }
      );
    });
    return () => ctx.revert();
  }, []);
  const handleDownload = useCallback(
    async (customized = false) => {
      if (!isLoaded || !photo) {
        setError("Image not loaded. Please try again.");
        return;
      }
      try {
        const img = new Image();
        img.src = photo.urls.regular;
        img.crossOrigin = "anonymous";
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = () => reject(new Error("Failed to load image."));
        });
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        if (customized && filter !== "none") {
          ctx.filter = filter;
          ctx.drawImage(img, 0, 0);
        }
        const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `wallory-${customized ? "customized-" : ""}${
          photo.id || "image"
        }`;
        link.click();
        link.remove();
      } catch {
        setError(
          `Failed to download ${customized ? "customized" : "original"} image.`
        );
      }
    },
    [isLoaded, photo, filter]
  );
  const handleOriginalDownload = async () => {
    if (!isLoaded || !photo?.id) {
      setError("Image not loaded or invalid.");
      return;
    }
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/${photo.id}/download?client_id=${
          import.meta.env.VITE_UNSPLASH_API_KEY
        }`
      );
      if (!response.ok) throw new Error("API request failed.");
      const { url } = await response.json();
      const imageResponse = await fetch(url);
      if (!imageResponse.ok) throw new Error("Image download failed.");
      const blob = await imageResponse.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${photo.alt_description || photo.id}`;
      link.click();
      link.remove();
      URL.revokeObjectURL(link.href);
    } catch {
      setError("Failed to download original image.");
    }
  };
  return (
    <>
      <div className="bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <header className="p-6 text-center">
          <h1 className="text-3xl font-['Agbalumo',cursive] text-indigo-600 dark:text-indigo-400 drop-shadow-md">
            Customization Studio
          </h1>
        </header>
        {error && (
          <div
            className="mx-6 mb-4 p-4 bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-xl shadow-md flex items-center gap-2 animate-fade-in"
            role="alert"
          >
            <FiInfo className="text-lg" />
            {error}
          </div>
        )}
        <main className="p-6 flex flex-col md:flex-row gap-6 items-center justify-center">
          <div className="canvas-area bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            {photo ? (
              <img
                src={photo.urls.regular}
                alt={photo.alt_description || "Selected wallpaper"}
                className="w-full h-full md:h-[70vh] transition-all duration-300"
                style={{ filter }}
                onLoad={() => setIsLoaded(true)}
                crossOrigin="anonymous"
              />
            ) : (
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse">
                <div className="w-full h-full bg-linear-to-r from-gray-200 dark:from-gray-700 via-gray-300 dark:via-gray-600 to-gray-200 dark:to-gray-700 animate-shimmer" />
              </div>
            )}
            {photo && (
              <p className="text-sm text-center text-gray-500 dark:text-gray-400 p-4">
                Photo by{" "}
                <a
                  href={`${photo.user.links.html}?utm_source=Wallory&utm_medium=referral`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {photo.user.name}
                </a>{" "}
                on{" "}
                <a
                  href="https://unsplash.com?utm_source=Wallory&utm_medium=referral"
                  target="_blank"
                  className="underline hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  Unsplash
                </a>
              </p>
            )}
          </div>
          <div className="customize-container w-full md:w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2.5">
              Customize
              <span
                className="text-sm text-gray-500 dark:text-gray-400"
                title="Apply filters to your wallpaper"
              >
                <FiInfo />
              </span>
            </h2>
            <div className="mt-6 space-y-2">
              <label
                htmlFor="imageFilter"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Image Filter
              </label>
              <select
                id="imageFilter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full p-2 rounded-lg outline-none border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              >
                {filters.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={() => handleDownload(true)}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-all"
                disabled={!isLoaded}
              >
                Download Customized
              </button>
              <button
                onClick={handleOriginalDownload}
                className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-all"
                disabled={!isLoaded}
              >
                Download Original
              </button>
            </div>
          </div>
        </main>
      </div>
      <BottomNav />
      <Footer />
    </>
  );
};
export default React.memo(Customize);