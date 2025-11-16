import { Link } from "react-router";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { gsap } from "gsap";
function About() {
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      [".about-title", ".about-description"],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.2 }
    )
      .fromTo(
        ".unsplash-credit",
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
    <>
      <main className="flex flex-col items-center justify-center min-h-screen bg-linear-to-b from-indigo-50 to-white px-4 py-16 sm:py-24 lg:px-12 dark:from-gray-900 dark:to-black transition-colors duration-300">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="about-title text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl dark:text-white">
            About Wallory
          </h1>
          <p className="about-description mt-6 text-lg font-medium text-gray-600 sm:text-xl/8 dark:text-gray-300">
            Wallory is your ultimate destination for discovering breathtaking
            wallpapers from Unsplash. Browse diverse categories, search for
            themes that inspire you, and customize your devices effortlessly
            with high-quality images.
          </p>
          <div className="unsplash-credit mt-8 text-sm text-gray-500 dark:text-gray-400">
            <p>
              Powered by{" "}
              <a
                href="https://unsplash.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline dark:text-indigo-400"
                aria-label="Visit Unsplash website"
              >
                Unsplash
              </a>
              , the world’s leading platform for free, high-resolution photos.
            </p>
          </div>
          <div className="action-buttons mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link
              to="/"
              className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
              aria-label="Return to homepage"
            >
              Back to Home
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
      <Footer />
    </>
  );
}
export default About;