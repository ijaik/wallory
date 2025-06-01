import { useState, useEffect } from "react";
import Wallpapers from "./Wallpapers";
function TabNavigationBar({
  categories = ["Latest", "Trending", "Most Popular"],
  storageKey = "wallpapers",
}) {
  const [activeCategory, setActiveCategory] = useState(() => {
    return (
      localStorage.getItem(`${storageKey}_activeCategory`) || categories[0]
    );
  });
  useEffect(() => {
    localStorage.setItem(`${storageKey}_activeCategory`, activeCategory);
  }, [activeCategory, storageKey]);
  return (
    <main>
      <div className="sticky top-0 left-0 right-0 bg-white dark:bg-black z-10 p-2.5">
        <div className="flex items-center justify-evenly overflow-auto">
          {categories.map((category) => (
            <button
              key={category}
              className={`p-2.5 m-[2.5px] text-nowrap rounded-md text-black dark:text-white text-base sm:cursor-pointer ${
                activeCategory === category
                  ? "bg-indigo-500 text-white"
                  : "hover:text-indigo-500"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <Wallpapers category={activeCategory} />
    </main>
  );
}
export default TabNavigationBar;