function Footer() {
  return (
    <footer className="text-center flex flex-col items-center justify-center pt-2.5 pb-2.5 text-black gap-y-[5px] overflow-hidden dark:text-white">
      <p className="text-[25px]">
        Made With{" "}
        <span className="text-pink-500 animate-pulse inline-block transition-transform duration-300 transform hover:scale-150">
          💗
        </span>{" "}
        By Jai
      </p>
      <p className="text-[25px] text-indigo-500 font-['Leckerli_One',_cursive]">Wally</p>
    </footer>
  );
}

export default Footer;
