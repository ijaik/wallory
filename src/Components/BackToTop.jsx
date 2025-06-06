import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(window.pageYOffset > 300);
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  return (
    <>
      {isVisible && (
        <li className="py-[5px] px-[2.5vw]">
          <button
            onClick={scrollToTop}
            className="rounded-full w-12 h-12 flex justify-center items-center text-white hover:bg-indigo-400/50 transition-colors dark:hover:bg-indigo-800/50"
          >
            <FaArrowUp size={24} />
          </button>
        </li>
      )}
    </>
  );
}
export default BackToTop;
