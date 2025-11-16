import { useState, useEffect, useCallback } from "react";
import Wallpapers from "./Wallpapers";
const TabNavigationBar = ({
  categories = [
    { name: "Latest", emoji: "✨" },
    { name: "Trending", emoji: "🔥" },
    { name: "Most Popular", emoji: "🏆" },
  ],
  storageKey = "wallpapers",
}) => {
  const [activeCategory, setActiveCategory] = useState(() => {
    const savedCategory = localStorage.getItem(`${storageKey}_activeCategory`);
    return savedCategory && categories.some((cat) => cat.name === savedCategory)
      ? savedCategory
      : categories[0].name;
  });
  useEffect(() => {
    localStorage.setItem(`${storageKey}_activeCategory`, activeCategory);
  }, [activeCategory, storageKey]);
  const handleCategoryChange = useCallback((categoryName) => {
    setActiveCategory(categoryName);
  }, []);
  return (
    <>
      <nav className="sticky top-0 left-0 right-0 z-10 p-2.5 dark:bg-black bg-white">
        <div className="flex items-center justify-evenly overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {categories.map(({ name, emoji }) => (
            <button
              key={name}
              className={`
                flex items-center gap-[5px] p-2.5 m-1.25 rounded-full transition-all duration-250 ease-linear
                sm:cursor-pointer hover:scale-105 text-nowrap text-center
                ${
                  activeCategory === name
                    ? "bg-indigo-500 text-white scale-105"
                    : "text-black dark:text-white hover:text-indigo-500 dark:hover:text-indigo-400"
                }
              `}
              onClick={() => handleCategoryChange(name)}
              aria-current={activeCategory === name ? "true" : "false"}
              aria-label={`Switch to ${name} category`}
            >
              <span>{emoji}</span>
              <span className="font-['Agbalumo',cursive]">{name}</span>
            </button>
          ))}
        </div>
      </nav>
      <Wallpapers category={activeCategory} />
    </>
  );
};
export default TabNavigationBar;