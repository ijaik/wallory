import { useState, useEffect } from "react";
import Nav from "../Components/Nav";
import BottomNav from "../Components/BottomNav";
import HeroSwiper from "../Components/HeroSwiper";
import TabNavigationBar from "../Components/TabNavigationBar";
import Footer from "../Components/Footer";
function Home() {
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    const hasCloseToast = localStorage.getItem("hasCloseToast");
    if (!hasCloseToast) {
      setShowToast(true);
    }
  }, []);
  const handleCloseToast = () => {
    localStorage.setItem("hasCloseToast", "true");
    setShowToast(false);
  };
  return (
    <>
      {showToast && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-[5px] z-40 flex items-center justify-center">
          <div
            id="toast-default"
            className="flex items-center w-full ml-2.5 mr-2.5 max-w-md p-4 text-gray-700 bg-white bg-opacity-90 border border-gray-200 rounded-lg shadow-lg dark:text-gray-200 dark:bg-gray-900 dark:bg-opacity-90 dark:border-gray-700 transition-all duration-300 z-50"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="flex-1 text-sm font-medium text-center capitalize">
              To download wallpaper, click on the wallpaper !
            </div>
            <button
              type="button"
              className="ml-3 p-2 rounded-lg text-gray-500 hover:text-gray-900 bg-transparent hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 dark:focus:ring-gray-600 transition-colors duration-200"
              onClick={handleCloseToast}
              aria-label="Close toast notification"
            >
              <span className="sr-only">Close notification</span>
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2 2l12 12M14 2L2 14"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
      <header className="flex flex-col">
        <Nav />
        <HeroSwiper showSlogans={true} />
      </header>
      <TabNavigationBar storageKey="home_wallpapers" />
      <BottomNav />
      <Footer />
    </>
  );
}
export default Home;