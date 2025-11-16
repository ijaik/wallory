import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
export default function Intro({ onComplete }) {
  const containerRef = useRef(null);
  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });
      tl.from(".title span", {
        x: (index) => (index % 2 === 0 ? -100 : 100),
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      })
        .to(".title span", {
          opacity: 0,
          duration: 0.6,
          delay: 0.5,
          ease: "power2.in",
        })
        .fromTo(
          ".tagline",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=1"
        )
        .to(
          ".tagline",
          {
            opacity: 0,
            duration: 0.6,
            ease: "power2.in",
          },
          "-=0.2"
        );
    },
    { scope: containerRef }
  );
  return (
    <div
      ref={containerRef}
      className="w-full h-screen fixed bg-linear-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-black flex flex-col justify-center items-center transition-colors duration-300"
      role="region"
      aria-label="Wallory introduction animation"
    >
      <div className="title flex justify-center items-center space-x-1 sm:space-x-2">
        {["W", "a", "l", "l", "o", "r", "y"].map((letter, index) => (
          <span
            key={index}
            style={{ willChange: "transform, opacity" }}
            className="font-['Agbalumo',cursive] text-4xl sm:text-6xl lg:text-8xl text-indigo-600 dark:text-indigo-400"
          >
            {letter}
          </span>
        ))}
      </div>
      <p className="tagline mt-5 mr-2.5 ml-2.5 text-lg sm:text-xl font-medium text-gray-600 dark:text-gray-300 max-w-md text-center">
        Discover stunning wallpapers to personalize your world.
      </p>
    </div>
  );
}