import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Nav from "../components/Nav";
import BottomNav from "../components/BottomNav";
import HeroSwiper from "../components/HeroSwiper";
import TabNavigationBar from "../components/TabNavigationBar";
import Footer from "../components/Footer";
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