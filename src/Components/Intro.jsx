import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
export default function Intro({ onComplete }) {
  const containerRef = useRef(null);
  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete,
      });
      tl.from(".title span", {
        scale: 0,
        duration: 1,
        opacity: 1,
        delay: 0.5,
      }).to(".title span", {
        duration: 1,
        opacity: 0,
        delay: 0.5,
        fontSize: "25vw",
        stagger: 0.15,
        onComplete,
      });
    },
    { scope: containerRef }
  );
  return (
    <div
      ref={containerRef}
      className="title w-full fixed h-screen text-indigo-500 text-5xl dark:bg-black flex justify-center items-center"
    >
      {["W", "a", "l", "l", "o", "r", "y"].map((letter, index) => (
        <span
          key={index}
          style={{ willChange: "transform, opacity" }}
          className="font-['Leckerli_One',_cursive]"
        >
          {letter}
        </span>
      ))}
    </div>
  );
}