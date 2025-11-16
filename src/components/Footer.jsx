import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
export default function Footer() {
  const [emojis, setEmojis] = useState([]);
  const emojiRefs = useRef({});
  const heartRef = useRef(null);
  const EMOJI_LIST = ["💗"];
  const triggerEmojiShower = () => {
    const newEmojis = Array.from({ length: 10 }, () => {
      const id = crypto.randomUUID();
      return {
        id,
        emoji: EMOJI_LIST[Math.floor(Math.random() * EMOJI_LIST.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
      };
    });
    setEmojis(newEmojis);
    setTimeout(() => setEmojis([]), 5000);
  };
  useGSAP(() => {
    emojis.forEach(({ id }) => {
      const el = emojiRefs.current[id];
      if (el) {
        gsap.fromTo(
          el,
          {
            scale: 0,
            opacity: 1,
          },
          {
            scale: 5,
            opacity: 0,
            x: "+=" + (Math.random() * 100 - 50),
            y: "+=" + (Math.random() * 100 - 50),
            duration: 5,
            ease: "back.out",
          }
        );
      }
    });
  }, [emojis]);
  useEffect(() => {
    Object.keys(emojiRefs.current).forEach((key) => {
      if (!emojis.find((e) => e.id === key)) {
        delete emojiRefs.current[key];
      }
    });
  }, [emojis]);
  return (
    <>
      {emojis.map(({ id, emoji, x, y }) => (
        <span
          key={id}
          ref={(el) => {
            if (el) emojiRefs.current[id] = el;
          }}
          className="fixed text-2xl pointer-events-none z-50"
          style={{ left: `${x}vw`, top: `${y}vh` }}
        >
          {emoji}
        </span>
      ))}
      <footer
        className="text-center flex flex-col items-center justify-center py-2.5 text-black gap-y-[5px] overflow-hidden dark:text-white"
        aria-label="Wallory footer"
      >
        <p className="text-[20px]">
          Made With{" "}
          <span
            ref={heartRef}
            className="animate-pulse text-pink-500 inline-block transition-all duration-500 ease-out hover:scale-150"
            onClick={triggerEmojiShower}
          >
            💗
          </span>{" "}
          By Jai
        </p>
        <p className="text-[25px] text-indigo-500 font-['Agbalumo',cursive]">
          Wallory
        </p>
      </footer>
    </>
  );
}