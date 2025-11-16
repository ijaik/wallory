import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import BottomNav from "../components/BottomNav";
import HeroSwiper from "../components/HeroSwiper";
import Card from "../components/Card";
import Wallpapers from "../components/Wallpapers";
import { TiArrowBackOutline } from "react-icons/ti";
import Footer from "../components/Footer";
import { mapCategory } from "../utils/map-category";
import { RiSearchLine } from "react-icons/ri";
function Explore() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const cardContainerRef = useRef(null);
  const searchFormRef = useRef(null);
  const headerRef = useRef(null);
  const hasAnimated = useRef(false);
  const exploreCategories = [
    {
      title: "Abstract",
      image:
        "https://i.pinimg.com/736x/4a/10/9b/4a109be9a36688e819dc032d4311954e.jpg",
    },
    {
      title: "Animals",
      image:
        "https://i.pinimg.com/736x/50/36/01/503601502d70735740570308e99e9b96.jpg",
    },
    {
      title: "Anime",
      image:
        "https://i.pinimg.com/736x/67/ea/96/67ea96c307e0e41fa9da96c414032285.jpg",
    },
    {
      title: "Art",
      image:
        "https://i.pinimg.com/736x/06/27/c3/0627c36ceac5abbed870c7ae46779c61.jpg",
    },
    {
      title: "Captured",
      image:
        "https://i.pinimg.com/736x/a3/bd/99/a3bd99ff636a9cd1c51b07c65f1aae60.jpg",
    },
    {
      title: "Classic",
      image:
        "https://i.pinimg.com/736x/f2/a1/f5/f2a1f5a00ceefc664add2f820689bf57.jpg",
    },
    {
      title: "Clouds",
      image:
        "https://i.pinimg.com/736x/4a/58/ce/4a58ce664918acb5f443697b5204c36e.jpg",
    },
    {
      title: "Flowers",
      image:
        "https://i.pinimg.com/736x/2c/48/eb/2c48eb09c8ce474b29c0487e7a9eecdc.jpg",
    },
    {
      title: "Games",
      image:
        "https://i.pinimg.com/736x/b9/85/d8/b985d84b46764e10a8b2f9b081760d54.jpg",
    },
    {
      title: "Moone",
      image:
        "https://i.pinimg.com/736x/0f/b5/51/0fb551c005d31e7356e259efe33edddd.jpg",
    },
    {
      title: "Music",
      image:
        "https://i.pinimg.com/736x/e4/f8/4b/e4f84b1f324fd2bea7be0edbb6800e40.jpg",
    },
    {
      title: "Nature",
      image:
        "https://i.pinimg.com/736x/fe/0b/41/fe0b412e65b930b8c9b71a77eda87904.jpg",
    },
    {
      title: "Places",
      image:
        "https://i.pinimg.com/736x/21/4b/73/214b736d289c1e6033915cd12110cace.jpg",
    },
    {
      title: "Sonne",
      image:
        "https://i.pinimg.com/736x/95/b7/6e/95b76e8f39ec81ef22d90bdf509ec350.jpg",
    },
    {
      title: "Sports",
      image:
        "https://i.pinimg.com/736x/1f/a0/12/1fa012aacbe5040384b1f6a7e46cc2b4.jpg",
    },
    {
      title: "Travel",
      image:
        "https://i.pinimg.com/736x/77/b4/21/77b421686d6088e6527cf57d68c69e96.jpg",
    },
    {
      title: "Universe",
      image:
        "https://i.pinimg.com/736x/10/7f/e0/107fe0d91a7011065f4353926ea983ab.jpg",
    },
    {
      title: "Vehicles",
      image:
        "https://i.pinimg.com/736x/09/73/c8/0973c8a0f497717e720e2d7c68ef012a.jpg",
    },
  ];
  function SearchForm({ setSelectedCategory }) {
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = (e) => {
      e.preventDefault();
      if (searchTerm.trim()) {
        setSelectedCategory(mapCategory(searchTerm.trim()));
      }
    };
    return (
      <form
        name="Search"
        ref={searchFormRef}
        onSubmit={handleSearch}
        className="absolute z-20 flex p-1.25 rounded-full border border-white overflow-hidden w-[80vw] sm:w-[50vw] text-white"
      >
        <input
          type="text"
          name="searchInput"
          placeholder="Search Your Wallory"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full outline-none pl-5 placeholder:text-white"
        />
        <button
          type="submit"
          className="flex items-center justify-center p-2.5 rounded-full bg-indigo-500 hover:bg-indigo-400 dark:bg-indigo-950 dark:hover:bg-indigo-800 active:scale-90"
          aria-label="Submit Search"
        >
          <RiSearchLine className="text-white w-7.5 h-7.5" />
        </button>
      </form>
    );
  }
  useEffect(() => {
    if (!hasAnimated.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
      gsap.fromTo(
        searchFormRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out", delay: 0.2 }
      );
      if (cardContainerRef.current && !selectedCategory) {
        const cards = cardContainerRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.4,
          }
        );
      }
      hasAnimated.current = true;
    }
  }, [selectedCategory]);
  return (
    <>
      <div
        ref={headerRef}
        className="flex flex-col items-center justify-center mt-10 text-center"
      >
        <h2 className="text-3xl mb-5">Explore Wallpapers</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
          Discover a variety of stunning wallpapers to personalize your device.
        </p>
      </div>
      <HeroSwiper
        mb={"mb-2.5"}
        SearchButton={() => (
          <SearchForm setSelectedCategory={setSelectedCategory} />
        )}
      />
      {selectedCategory ? (
        <>
          <div className="sticky top-0 bg-white dark:bg-black flex justify-center items-center p-2.5 z-20">
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center justify-center text-2xl p-2.5 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
            >
              <TiArrowBackOutline />
            </button>
            <h1 className="grow text-center text-[31.25px] text-indigo-500 font-['Agbalumo',cursive]">
              {selectedCategory}
            </h1>
          </div>
          <Wallpapers category={selectedCategory} />
        </>
      ) : (
        <div
          ref={cardContainerRef}
          className="flex justify-evenly items-center flex-wrap mt-5 mb-5"
        >
          {exploreCategories.map((category, index) => (
            <Card
              key={index}
              title={category.title}
              image={category.image}
              onClick={() => setSelectedCategory(category.title)}
            />
          ))}
        </div>
      )}
      <BottomNav />
      <Footer />
    </>
  );
}
export default Explore;