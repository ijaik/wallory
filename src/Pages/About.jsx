import { Link } from "react-router";
import Footer from "../Components/Footer";

function About() {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-black">
        <div className="text-center">
          <h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl dark:text-white">
            About Walls
          </h1>
          <p className="mt-6 text-lg font-medium text-gray-500 sm:text-xl/8 dark:text-gray-200">
            Walls is your go-to platform for discovering stunning wallpapers
            from Unsplash. Explore a wide range of categories, search for your
            favorite themes, and personalize your devices with ease.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500"
            >
              Back to Home
            </Link>
            <Link
              to="/explore"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
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
