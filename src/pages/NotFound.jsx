import { useEffect } from "react";
import { Link } from "react-router";
import { gsap } from "gsap";
function NotFound() {
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".error-code",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.4)" }
    )
      .fromTo(
        ".error-title",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        ".error-message",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        ".action-buttons",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.2)" },
        "-=0.4"
      );
  }, []);
  return (
    <main className="grid h-screen place-items-center bg-linear-to-b from-indigo-50 to-white px-4 py-16 sm:py-24 lg:px-12 dark:from-gray-900 dark:to-black transition-colors duration-300">
      <div
        className="text-center max-w-3xl mx-auto"
        role="alert"
        aria-labelledby="error-title"
      >
        <p className="error-code text-6xl font-bold text-indigo-600 dark:text-indigo-400 sm:text-8xl">
          404
        </p>
        <h1
          id="error-title"
          className="error-title mt-4 text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl lg:text-7xl dark:text-white"
        >
          Oops! Page Not Found
        </h1>
        <p className="error-message mt-6 text-lg font-medium text-pretty text-gray-600 sm:text-xl/8 dark:text-gray-300">
          Looks like this page got lost in the wallpaper wilderness. Let’s get
          you back to finding stunning visuals!
        </p>
        <div className="action-buttons mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link
            to="/"
            className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
            aria-label="Return to homepage"
          >
            Go Back Home
          </Link>
          <Link
            to="/explore"
            className="rounded-md border border-indigo-600 px-4 py-2.5 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-gray-800 dark:hover:text-indigo-300 transition-all duration-200"
            aria-label="Explore wallpaper collection"
          >
            Explore Wallpapers
          </Link>
        </div>
      </div>
    </main>
  );
}
export default NotFound;