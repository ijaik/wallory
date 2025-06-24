import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper/modules";
import SkeletonLoading from "./SkeletonLoading";
import { useFetchData } from "../Hook/useFetchData";
import React, { useState } from "react";
function HeroSwiper({
  mb = "mb-0",
  SearchButton,
  showSlogans = false,
  category = "aurora",
}) {
  const fallbackImages = [
    "https://i.pinimg.com/1200x/93/f8/6d/93f86da5f9810ca2e6b9807a58857c24.jpg",
    "https://i.pinimg.com/736x/10/7f/e0/107fe0d91a7011065f4353926ea983ab.jpg",
    "https://i.pinimg.com/1200x/32/c3/43/32c34315124cd23f668259546ba74d88.jpg",
    "https://i.pinimg.com/736x/fe/0b/41/fe0b412e65b930b8c9b71a77eda87904.jpg",
    "https://i.pinimg.com/736x/06/27/c3/0627c36ceac5abbed870c7ae46779c61.jpg",
  ];
  const slideSlogans = [
    "🖼️ Make Your Walls Smile — with Wallory 🎨",
    "🏡 Your Space. Your Mood. Your Wallory 💫",
    "💡 Inspire Every Swipe, Every Wall 🔁",
    "🎶 Design Vibes, Not Just Walls ✨",
    "🧩 Your Walls, Your World — Only on Wallory 💗",
  ];
  const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
  const { data, loading, error } = useFetchData(category, API_KEY, 5);
  const images =
    !error && data.length > 0
      ? data.map((item) => item.urls?.regular || fallbackImages[0])
      : fallbackImages;
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
        {images.map((image, index) => {
          const [isLoaded, setIsLoaded] = useState(false);
          return (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <SkeletonLoading isLoading={!isLoaded || loading}>
                  <img
                    className={`w-full h-full object-cover rounded-2xl brightness-50 transition-opacity duration-300 ${
                      !isLoaded || loading ? "opacity-0" : "opacity-100"
                    }`}
                    src={image}
                    alt={`Slide ${index + 1}`}
                    loading="lazy"
                    onLoad={() => setIsLoaded(true)}
                  />
                </SkeletonLoading>
                {showSlogans && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h2
                      className={`font-['Leckerli_One',_cursive] dark:text-white text-2xl md:text-3xl text-center px-4 drop-shadow-lg ${
                        !isLoaded ? "text-black" : "text-white"
                      }`}
                    >
                      {slideSlogans[index] || ""}
                    </h2>
                  </div>
                )}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {SearchButton && <SearchButton />}
    </div>
  );
}
export default HeroSwiper;