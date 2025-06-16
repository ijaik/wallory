import { GoHome, GoHomeFill } from "react-icons/go";
import { RiSearchLine, RiSearchFill } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { ThemeContext } from "../Contexts/ThemeContext";
function BottomNav() {
  const location = useLocation();
  const [activeNav, setActiveNav] = useState(() => {
    return localStorage.getItem("activeNav") || "home";
  });
  useEffect(() => {
    const currentPath = location.pathname;
    const newActiveNav = currentPath === "/explore" ? "explore" : "home";
    setActiveNav(newActiveNav);
    localStorage.setItem("activeNav", newActiveNav);
  }, [location.pathname]);
  useEffect(() => {
    let lastScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;
    let timeout;
    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const currentScrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const bottomNav = document.querySelector(".bottom-nav");
        if (currentScrollTop > lastScrollTop) {
          bottomNav.style.transform = "translateY(150px)";
        } else {
          bottomNav.style.transform = "translateY(0)";
        }
        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
      }, 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  return (
    <nav className="bottom-nav fixed z-30 left-1/2 bottom-[25px] transform -translate-x-1/2 bg-indigo-500 dark:bg-indigo-950 rounded-full transition-all duration-250 ease-linear">
      <ul className="flex justify-evenly items-center">
        <li className="py-[5px] px-[5vw] sm:px-[2.5vw]">
          <NavLink to="/" className="cursor-default sm:cursor-pointer">
            {activeNav === "home" ? (
              <GoHomeFill className="text-[#ffffff] w-12 h-12 dark:hover:bg-indigo-800 rounded-full px-2 py-2 hover:bg-indigo-400" />
            ) : (
              <GoHome className="text-[#ffffff] w-12 h-12 dark:hover:bg-indigo-800 rounded-full px-2 py-2 hover:bg-indigo-400" />
            )}
          </NavLink>
        </li>
        <li className="py-[5px] px-[5vw] sm:px-[2.5vw]">
          <NavLink to="/explore" className="cursor-default sm:cursor-pointer">
            {activeNav === "explore" ? (
              <RiSearchFill className="text-[#ffffff] w-12 h-12 dark:hover:bg-indigo-800 rounded-full px-2 py-2 hover:bg-indigo-400" />
            ) : (
              <RiSearchLine className="text-[#ffffff] w-12 h-12 dark:hover:bg-indigo-800 rounded-full px-2 py-2 hover:bg-indigo-400" />
            )}
          </NavLink>
        </li>
        <li className="py-[5px] px-[5vw] sm:px-[2.5vw]">
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            className="darkmode-cursor hover:bg-indigo-400 dark:hover:bg-indigo-800 rounded-full px-2 py-2"
            sunColor="white"
            moonColor="white"
            size={48}
            style={{ cursor: "default" }}
          />
        </li>
      </ul>
    </nav>
  );
}
export default BottomNav;