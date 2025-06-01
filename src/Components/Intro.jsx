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
        y: 150,
        duration: 0.5,
        opacity: 0,
        stagger: 0.25,
      })
        .to(".title span", {
          duration: 1,
          opacity: 0,
          delay: 0.5,
        })
        .to(
          ".IntroFinish",
          {
            height: "100%",
            duration: 1,
          },
          "a"
        )
        .to(
          ".Intro",
          {
            height: "0%",
            top: 0,
            duration: 1.5,
            onComplete,
          },
          "a"
        );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <div className="Intro w-full fixed h-screen bg-indigo-500 text-white dark:bg-indigo-900">
        <div className="flex justify-center items-center h-full text-5xl">
          <div className="title h-[25%] overflow-hidden flex justify-center items-center">
            {["W", "a", "l", "l", "y"].map((letter, index) => (
              <span
                key={index}
                style={{ willChange: "transform, opacity" }}
                className="font-['Leckerli_One',_cursive]"
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
        <div
          className="IntroFinish absolute bottom-0 h-0 w-full bg-indigo-400"
          style={{ willChange: "height" }}
        />
      </div>
    </div>
  );
}
