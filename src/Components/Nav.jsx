import { Link } from "react-router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
export default function Nav() {
  useGSAP(() => {
    gsap.from(".navLi", {
      opacity: 0,
      y: -10,
      duration: 1,
      stagger: 0.5,
      ease: "power2.out",
    });
  });
  return (
    <nav
      className="nav relative top-0 left-0 right-0"
      aria-label="Main navigation"
    >
      <ul className="flex justify-evenly items-center py-2.5 text-2xl">
        <li className="navLi text-indigo-500 font-['Leckerli_One',_cursive] text-[40px]">
          <Link
            to="/"
            className="cursor-default sm:cursor-pointer hover:text-indigo-600 transition-colors duration-200"
            aria-label="Wallory homepage with Unsplash wallpapers"
          >
            W
          </Link>
        </li>
        <li className="navLi hover:text-indigo-500">
          <Link
            to="/about"
            className="cursor-default sm:cursor-pointer hover:text-indigo-500 transition-colors duration-200"
            aria-label="About Wallory page"
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}