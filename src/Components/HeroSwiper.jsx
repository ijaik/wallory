import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import SkeletonLoading from "./SkeletonLoading";
function HeroSwiper({ mb = "mb-0", SearchButton, showSlogans = false }) {
  const fallbackImages = [
    "https://images.unsplash.com/photo-1503416997304-7f8bf166c121",
    "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869",
  ];
  const slideSlogans = [
    "Your Space, Your Vision",
    "Craft Your Dream Wall",
    "Inspire Your Surroundings",
    "Shape Your Unique Story",
    "Design Your Perfect Scene",
  ];
  const [images, setImages] = useState(fallbackImages);
  const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
  useEffect(() => {
    const fetchDailyWallpapers = async () => {
      const cacheKey = "daily_wallpapers";
      const cacheTimestampKey = "daily_wallpapers_timestamp";
      const cachedPhotos = localStorage.getItem(cacheKey);
      const cachedTimestamp = localStorage.getItem(cacheTimestampKey);
      const now = new Date();
      const oneWeekInMs = 7 * 24 * 60 * 60 * 1000; // 7 days
      if (cachedPhotos && cachedTimestamp) {
        const timeDiff = now.getTime() - parseInt(cachedTimestamp, 10);
        if (timeDiff < oneWeekInMs) {
          setImages(JSON.parse(cachedPhotos));
          return;
        }
      }
      try {
        const query = "Captured,Flowers,Moon,Places,Sunset";
        const url = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
          query
        )}&count=5&client_id=${API_KEY}`;
        const response = await fetch(url);
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Invalid or missing API key.");
          } else if (response.status === 429) {
            throw new Error("Rate limit exceeded. Please try again later.");
          } else {
            throw new Error(`Network error: ${response.statusText}`);
          }
        }
        const photos = await response.json();
        const photoUrls = photos.map((photo) => photo.urls.regular);
        localStorage.setItem(cacheKey, JSON.stringify(photoUrls));
        localStorage.setItem(cacheTimestampKey, now.getTime().toString());
        setImages(photoUrls);
      } catch (err) {
        console.error("Failed to fetch daily wallpapers:", err);
        setImages(fallbackImages);
      }
    };
    fetchDailyWallpapers();
  }, []);
  const [isLoading, setIsLoading] = useState(true);
  const handleImageLoad = () => {
    setIsLoading(false);
  };
  return (
    <div
      className={`flex justify-center items-center ${mb} px-[10px] overflow-hidden h-[350px]`}
    >
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        className="mySwiper h-full cursor-grab"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <SkeletonLoading isLoading={isLoading}>
                <img
                  className={`w-full h-full object-cover rounded-2xl brightness-50 ${
                    isLoading ? "opacity-0" : "opacity-100"
                  }`}
                  src={image}
                  alt={`Slide ${index + 1}`}
                  loading="lazy"
                  onLoad={handleImageLoad}
                />
              </SkeletonLoading>
              {showSlogans && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2
                    className={`dark:text-white text-2xl md:text-3xl font-bold text-center px-4 drop-shadow-lg ${
                      isLoading ? "text-black" : "text-white"
                    }`}
                  >
                    {slideSlogans[index]}
                  </h2>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute z-20">{SearchButton && <SearchButton />}</div>
    </div>
  );
}
export default HeroSwiper;