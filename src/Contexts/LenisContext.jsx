import { createContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
export const LenisContext = createContext();
export const LenisProvider = ({ children }) => {
  const lenisRef = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({
      lerp: 0.1,
    });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const rafCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);
    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafCallback);
    };
  }, []);
  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </LenisContext.Provider>
  );
};
export default LenisContext;