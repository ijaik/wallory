import { Link } from "react-router";
export default function Nav() {
  return (
    <nav className="relative top-0 left-0 right-0" aria-label="Main navigation">
      <ul className="flex justify-evenly items-center py-2.5 text-2xl">
        <li className="text-indigo-500 font-['Agbalumo',cursive] text-[40px]">
          <Link
            to="/"
            className="cursor-default sm:cursor-pointer hover:text-indigo-600 transition-colors duration-200"
            aria-label="Wallory homepage"
          >
            W
          </Link>
        </li>
        <li className="hover:text-indigo-500">
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