import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { gsap } from "gsap";
import Footer from "../Components/Footer";
import BottomNav from "../Components/BottomNav";
import { FiInfo } from "react-icons/fi";
function Customize() {
  const navigate = useNavigate();
  const location = useLocation();
  const canvasRef = useRef(null);
  const textRef = useRef(null);
  const controlsRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [filter, setFilter] = useState("none");
  const [text, setText] = useState("");
  const [textColor, setTextColor] = useState("#615fff");
  const [textSize, setTextSize] = useState(24);
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
  useEffect(() => {
    const state = location.state;
    if (state?.photo) {
      setPhoto(state.photo);
    } else {
      setError("No photo selected. Redirecting to Explore...");
      setTimeout(() => navigate("/explore"), 2000);
    }
  }, [location.state, navigate]);
  useEffect(() => {
    const animate = () => {
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
    };
    animate();
    return () => {
      gsap.killTweensOf(".customize-container, .canvas-area");
    };
  }, []);
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e) => {
    if (isDragging && textRef.current && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0]?.clientX);
      const clientY = e.clientY || (e.touches && e.touches[0]?.clientY);
      if (clientX && clientY) {
        const x = ((clientX - rect.left) / rect.width) * 100;
        const y = ((clientY - rect.top) / rect.height) * 100;
        setTextPosition({
          x: Math.max(0, Math.min(100, x)),
          y: Math.max(0, Math.min(100, y)),
        });
      }
    }
  };
  const customizeHandleDownload = async () => {
    if (!canvasRef.current || !isLoaded || !photo) {
      setError("Image not loaded. Please wait and try again.");
      return;
    }
    try {
      const img = new Image();
      img.src = photo.urls.regular;
      img.crossOrigin = "anonymous";
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () =>
          reject(
            new Error("Failed to load image due to CORS or network issue.")
          );
      });
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      if (filter !== "none") {
        const supportedFilters = ["grayscale(100%)", "brightness(150%)"];
        if (supportedFilters.includes(filter)) {
          ctx.filter = filter;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        } else if (filter === "sepia(100%)") {
          ctx.filter = "none";
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
            data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
            data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
          }
          ctx.putImageData(imageData, 0, 0);
        }
      }
      if (text) {
        ctx.font = `${textSize * 2}px 'Leckerli One', cursive`;
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const x = (textPosition.x / 100) * canvas.width;
        const y = (textPosition.y / 100) * canvas.height;
        ctx.fillText(text, x, y);
      }
      const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `wallory-customized-${photo.id || "image"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError("Failed to download customized image.");
    }
  };
  const handleDownload = async () => {
    if (!isLoaded || !photo?.id) {
      setError("Image not loaded or invalid. Please try again.");
      return;
    }
    try {
      const downloadUrl = `https://api.unsplash.com/photos/${photo.id}/download?client_id=${API_KEY}`;
      const response = await fetch(downloadUrl);
      if (!response.ok) {
        throw new Error("API request failed.");
      }
      const data = await response.json();
      if (!data.url) {
        throw new Error("No download URL provided by Unsplash.");
      }
      const imageResponse = await fetch(data.url);
      if (!imageResponse.ok) {
        throw new Error("Image download failed.");
      }
      const blob = await imageResponse.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${photo.alt_description || photo.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError("Failed to download original image. Please try again.");
    }
  };
  const filters = [
    { name: "None", value: "none" },
    { name: "Grayscale", value: "grayscale(100%)" },
    { name: "Sepia", value: "sepia(100%)" },
    { name: "Bright", value: "brightness(150%)" },
  ];
  return (
    <>
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <header className="p-6 text-center">
          <h1 className="text-3xl font-['Leckerli_One',_cursive] text-indigo-600 dark:text-indigo-400 drop-shadow-md">
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
        <main className="p-6 flex flex-col md:flex-row gap-6 items-start justify-center">
          <div className="canvas-area flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <div
              ref={canvasRef}
              onMouseMove={handleMouseMove}
              onTouchMove={handleMouseMove}
              role="region"
              aria-label="Image customization canvas"
            >
              {photo ? (
                <>
                  <img
                    src={photo.urls.regular}
                    alt={photo.alt_description || "Selected wallpaper"}
                    className="w-full h-full object-contain transition-all duration-300"
                    style={{ filter }}
                    onLoad={() => setIsLoaded(true)}
                    crossOrigin="anonymous"
                  />
                  {text && (
                    <div
                      ref={textRef}
                      className="absolute"
                      style={{
                        left: `${textPosition.x}%`,
                        top: `${textPosition.y}%`,
                        color: textColor,
                        fontSize: `${textSize}px`,
                        transform: "translate(-50%, -50%)",
                        cursor: isDragging ? "grabbing" : "grab",
                        fontFamily: "'Leckerli One', cursive",
                      }}
                      onMouseDown={handleMouseDown}
                      onMouseUp={handleMouseUp}
                      onTouchStart={handleMouseDown}
                      onTouchEnd={handleMouseUp}
                      role="textbox"
                      aria-label="Draggable text overlay"
                    >
                      {text}
                    </div>
                  )}
                </>
              ) : (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse">
                  <div className="w-full h-full bg-gradient-to-r from-gray-200 dark:from-gray-700 via-gray-300 dark:via-gray-600 to-gray-200 dark:to-gray-700 animate-shimmer" />
                </div>
              )}
            </div>
            {photo && (
              <p className="text-sm text-center text-gray-500 dark:text-gray-400 p-4">
                Photo by{" "}
                <a
                  href={`${photo.user.links.html}?utm_source=Wallory&utm_medium=referral`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  aria-label={`View ${photo.user.name}'s Unsplash profile`}
                >
                  {photo.user.name}
                </a>{" "}
                on{" "}
                <a
                  href="https://unsplash.com?utm_source=Wallory&utm_medium=referral"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  aria-label="Visit Unsplash"
                >
                  Unsplash
                </a>
              </p>
            )}
          </div>
          <div
            ref={controlsRef}
            className="customize-container w-full md:w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:sticky md:top-6 flex flex-col gap-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2.5">
              Customize
              <span
                className="text-sm text-gray-500 dark:text-gray-400"
                title="Apply filters and text to your wallpaper"
              >
                <FiInfo />
              </span>
            </h2>
            <div className="space-y-2">
              <label
                htmlFor="filter-select"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Image Filter
              </label>
              <div className="relative">
                <select
                  id="filter-select"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full outline-none p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all"
                  aria-label="Select image filter"
                >
                  {filters.map((f) => (
                    <option key={f.name} value={f.value}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="text-input"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Text Overlay
              </label>
              <input
                id="text-input"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add your text"
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all"
                aria-label="Enter text for overlay"
              />
              <div className="flex items-center gap-3 mt-3">
                <div className="relative group">
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-10 h-10 sm:cursor-pointer"
                    aria-label="Select text color"
                  />
                  <span className="absolute hidden group-hover:block -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 dark:bg-gray-600 text-white dark:text-gray-100 text-xs px-2 py-1 rounded">
                    Color
                  </span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="72"
                  value={textSize}
                  onChange={(e) => setTextSize(Number(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-indigo-500 dark:accent-indigo-400"
                  aria-label="Adjust text size"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={customizeHandleDownload}
                className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                disabled={!isLoaded}
                aria-label="Download Customized Wallpaper"
              >
                Download Customized
                {!isLoaded && (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8h4l-3 3 3 3h-4a8 8 0 010-16z"
                    ></path>
                  </svg>
                )}
              </button>
              <button
                onClick={() => handleDownload()}
                className="w-full bg-gray-600 dark:bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                disabled={!isLoaded}
                aria-label="Download Original Wallpaper"
              >
                Download Original
                {!isLoaded && (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8h4l-3 3 3 3h-4a8 8 0 010-16z"
                    ></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </main>
      </div>
      <BottomNav />
      <Footer />
    </>
  );
}
export default Customize;