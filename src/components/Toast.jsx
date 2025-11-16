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
      className="fixed top-[82px] right-5 left-5 sm:left-auto transition-transform duration-250 ease-out z-50"
      onClick={handleCloseToast}
    >
      <div
        id="toast-default"
        className="flex justify-between items-center p-4 text-gray-700 bg-white border border-gray-200 rounded-xl shadow-lg dark:text-gray-200 dark:bg-gray-900 dark:bg-opacity-95 dark:border-gray-700 transition-all duration-250 ease-out"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        onClick={(e) => e.stopPropagation()}
      >
        {type === "download" ? (
          <div className="font-['Agbalumo',cursive] text-center mr-2">
            🖼️ Tap the wallpaper to customize or download it!
          </div>
        ) : (
          <div className="font-['Agbalumo',cursive] text-center mr-2">
            🚀 Install <strong>Wallory</strong> for the best experience!
          </div>
        )}
        {type === "install" && deferredPrompt && (
          <button
            onClick={handleInstallClick}
            className="bg-indigo-500 text-white hover:bg-indigo-600 text-nowrap px-3 py-1.5 rounded-full transition-colors duration-250 ease-out"
            aria-label="Install Wallory App"
          >
            Install App
          </button>
        )}
        <button
          type="button"
          className="ml-2 p-2 rounded-full text-gray-500 hover:text-black hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 transition-colors duration-200 ease-out active:bg-gray-400 dark:active:bg-gray-400"
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