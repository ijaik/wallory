function Footer() {
  return (
    <footer
      className="text-center flex flex-col items-center justify-center pt-2.5 pb-2.5 text-black gap-y-[5px] overflow-hidden dark:text-white"
      aria-label="Wallory footer"
    >
      <p className="text-[20px]">
        Made With{" "}
        <span className="animate-pulse text-pink-500 inline-block transition-all duration-500 ease-out hover:scale-150">
          💗
        </span>{" "}
        By Jai | Powered by{" "}
        <a
          href="https://unsplash.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
          aria-label="Visit Unsplash website"
        >
          Unsplash
        </a>
      </p>
      <p className="text-[25px] text-indigo-500 font-['Leckerli_One',_cursive]">
        Wallory
      </p>
    </footer>
  );
}
export default Footer;