import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper/modules";
import SkeletonLoading from "./SkeletonLoading";
import { useFetchData } from "../Hook/useFetchData";
import { useState } from "react";
function HeroSwiper({
  mb = "mb-0",
  SearchButton,
  showSlogans = false,
  category = "aurora",
}) {
  const slideSlogans = [
    "🖼️ Make Your Walls Smile — with Wallory 🎨",
    "🏡 Your Space. Your Mood. Your Wallory 💫",
    "💡 Inspire Every Swipe, Every Wall 🔁",
    "🎶 Design Vibes, Not Just Walls ✨",
    "🧩 Your Walls, Your World — Only on Wallory 💗",
  ];
  const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
  const { data, loading } = useFetchData(category, API_KEY, 5);
  const images = data.map((item) => item.urls?.regular).filter(Boolean);
  const [loadedStates, setLoadedStates] = useState(
    Array(images.length).fill(false)
  );
  const handleImageLoad = (index) => {
    setLoadedStates((prev) => {
      const newStates = [...prev];
      newStates[index] = true;
      return newStates;
    });
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
              <SkeletonLoading isLoading={!loadedStates[index] || loading}>
                <img
                  className={`w-full h-full object-cover rounded-2xl brightness-50 transition-opacity duration-300 ${
                    !loadedStates[index] || loading
                      ? "opacity-0"
                      : "opacity-100"
                  }`}
                  src={image}
                  alt={`Slide ${index + 1}`}
                  loading="lazy"
                  onLoad={() => handleImageLoad(index)}
                />
              </SkeletonLoading>
              {showSlogans && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2
                    className={`font-['Leckerli_One',_cursive] dark:text-white text-2xl md:text-3xl text-center px-4 drop-shadow-lg ${
                      !loadedStates[index] ? "text-black" : "text-white"
                    }`}
                  >
                    {slideSlogans[index] || ""}
                  </h2>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {SearchButton && <SearchButton />}
    </div>
  );
}
export default HeroSwiper;