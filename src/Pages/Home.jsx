import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Nav from "../Components/Nav";
import BottomNav from "../Components/BottomNav";
import HeroSwiper from "../Components/HeroSwiper";
import TabNavigationBar from "../Components/TabNavigationBar";
import Footer from "../Components/Footer";
function Home() {
  const headerRef = useRef(null);
  const mainRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
    gsap.fromTo(
      mainRef.current,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out", delay: 0.3 }
    );
  }, []);
  return (
    <>
      <header ref={headerRef} className="flex flex-col justify-center">
        <Nav />
        <HeroSwiper showSlogans={true} />
      </header>
      <main ref={mainRef}>
        <TabNavigationBar storageKey="home_wallpapers" />
      </main>
        <BottomNav />
        <Footer />
    </>
  );
}
export default Home;