import { useState, useEffect } from "react";
import Wallpapers from "./Wallpapers";
function TabNavigationBar({
  categories = [
    { name: "Latest", emoji: "✨" },
    { name: "Trending", emoji: "🔥" },
    { name: "Most Popular", emoji: "🏆" },
  ],
  storageKey = "wallpapers",
}) {
  const [activeCategory, setActiveCategory] = useState(() => {
    const savedCategory = localStorage.getItem(`${storageKey}_activeCategory`);
    return savedCategory || categories[0].name;
  });
  useEffect(() => {
    localStorage.setItem(`${storageKey}_activeCategory`, activeCategory);
  }, [activeCategory, storageKey]);
  return (
    <main>
      <nav className="sticky top-0 left-0 right-0 z-10 p-2.5 dark:bg-black bg-white">
        <div className="flex items-center justify-evenly overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {categories.map(({ name, emoji }) => (
            <button
              key={name}
              className={`text-nowrap relative flex items-center gap-[5px] p-2.5 mt-[2.5px] mb-[2.5px] ml-[5px] mr-[5px] transition-all duration-250 ease-linear rounded-full sm:cursor-pointer transform hover:scale-105 ${
                activeCategory === name
                  ? "bg-indigo-500 text-white scale-110"
                  : "text-black dark:text-white hover:text-indigo-500"
              }`}
              onClick={() => setActiveCategory(name)}
            >
              <span>{emoji}</span>
              <span>{name}</span>
            </button>
          ))}
        </div>
      </nav>
      <Wallpapers category={activeCategory} />
    </main>
  );
}
export default TabNavigationBar;