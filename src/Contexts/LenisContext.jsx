import { createContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
const defaultLenisContext = {
  lenis: null,
};
export const LenisContext = createContext(defaultLenisContext);
export const LenisProvider = ({ children, lenisOptions = { lerp: 0.1 } }) => {
  const lenisRef = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis(lenisOptions);
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const rafCallback = (time) => {
      lenis.raf(time);
    };
    gsap.ticker.add(rafCallback);
    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafCallback);
      ScrollTrigger.clearScrollMemory();
    };
  }, [lenisOptions]);
  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </LenisContext.Provider>
  );
};
export default LenisContext;