import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
function Toast({ type, handleCloseToast, deferredPrompt, handleInstallClick }) {
  const containerRef = useRef(null);
  useGSAP(
    () => {
      if (containerRef.current) {
        gsap.from(containerRef.current, {
          right: -10,
          opacity: 0,
          duration: 1,
          delay: 1,
          ease: "power2.out",
        });
      }
    },
    { scope: containerRef }
  );
  return (
    <div
      ref={containerRef}
      className="fixed top-[82px] right-5 left-auto transition-transform duration-250 ease-out z-50"
      onClick={handleCloseToast}
    >
      <div
        id="toast-default"
        className="flex flex-col sm:flex-row items-center p-4 text-gray-700 bg-white bg-opacity-95 border border-gray-200 rounded-xl shadow-lg dark:text-gray-200 dark:bg-gray-900 dark:bg-opacity-95 dark:border-gray-700 transition-all duration-300"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        onClick={(e) => e.stopPropagation()}
      >
        {type === "download" ? (
          <div className="flex-1 font-['Leckerli_One',_cursive] text-sm text-center mb-2 sm:mb-0 sm:mr-2">
            🖼️ Tap the wallpaper to download it!
          </div>
        ) : (
          <div className="flex-1 font-['Leckerli_One',_cursive] text-sm text-center mb-2 sm:mb-0 sm:mr-2">
            🚀 Install <strong>Wallory</strong> for the best experience!
          </div>
        )}
        {type === "install" && deferredPrompt && (
          <button
            onClick={handleInstallClick}
            className="bg-indigo-500 text-white hover:bg-indigo-600 text-xs px-3 py-1.5 rounded-lg transition-colors duration-200"
            aria-label="Install Wallory App"
          >
            Install App
          </button>
        )}
        <button
          type="button"
          className="ml-2 p-1.5 rounded-lg text-gray-500 hover:text-gray-900 bg-transparent hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 dark:focus:ring-gray-600 transition-colors duration-200"
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
  );
}
export default Toast;