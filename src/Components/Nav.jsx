import { Link } from "react-router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Nav() {
  useGSAP(() => {
    gsap.from(".navLi", {
      y: -10,
      opacity: 0,
      duration: 1,
      stagger: 0.5,
    });
  });

  return (
    <nav className="nav relative top-0 left-0 right-0">
      <ul className="flex justify-evenly items-center py-2.5 text-2xl">
        <li className="navLi text-indigo-500 font-['Leckerli_One',_cursive] text-[40px]">
          <Link to="/" className="cursor-default sm:cursor-pointer">
            W
          </Link>
        </li>
        <li className="navLi hover:text-indigo-500">
          <Link to="/about" className="cursor-default sm:cursor-pointer">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}
