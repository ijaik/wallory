import { useState, useEffect } from "react";
import Nav from "../Components/Nav";
import BottomNav from "../Components/BottomNav";
import HeroSwiper from "../Components/HeroSwiper";
import TabNavigationBar from "../Components/TabNavigationBar";
import Footer from "../Components/Footer";
import Toast from "../Components/Toast";
function Home() {
  const [showDownloadToast, setShowDownloadToast] = useState(false);
  const [showInstallToast, setShowInstallToast] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  useEffect(() => {
    const checkIsInstalled = () => {
      return (
        window.matchMedia("(display-mode: standalone)").matches ||
        navigator.standalone ||
        window.navigator.userAgent.includes("MobileApp")
      );
    };
    setIsInstalled(checkIsInstalled());
    const hasClosedDownloadToast = localStorage.getItem(
      "hasClosedDownloadToast"
    );
    const hasClosedInstallToast = localStorage.getItem("hasClosedInstallToast");
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      if (!checkIsInstalled()) {
        setDeferredPrompt(e);
        localStorage.setItem("isInstallable", "true");
      }
    };

    // Handle appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      localStorage.setItem("isInstallable", "false");
      setShowInstallToast(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    // Show toasts based on localStorage and installation status
    if (!hasClosedDownloadToast) {
      setShowDownloadToast(true);
    } else if (!hasClosedInstallToast && !checkIsInstalled()) {
      setShowInstallToast(true);
    }

    // Cleanup event listeners
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);
  const handleCloseDownloadToast = () => {
    localStorage.setItem("hasClosedDownloadToast", "true");
    setShowDownloadToast(false);
    if (!localStorage.getItem("hasClosedInstallToast") && !isInstalled) {
      setShowInstallToast(true);
    }
  };
  const handleCloseInstallToast = () => {
    localStorage.setItem("hasClosedInstallToast", "true");
    setShowInstallToast(false);
  };
  const handleInstallClick = async () => {
    if (deferredPrompt && deferredPrompt !== true) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      setDeferredPrompt(null);
      localStorage.setItem("isInstallable", "false");
      setShowInstallToast(false);
    }
  };
  return (
    <>
      {showDownloadToast && (
        <Toast type="download" handleCloseToast={handleCloseDownloadToast} />
      )}
      {showInstallToast && !isInstalled && (
        <Toast
          type="install"
          handleCloseToast={handleCloseInstallToast}
          deferredPrompt={deferredPrompt}
          handleInstallClick={handleInstallClick}
        />
      )}
      <header className="flex flex-col">
        <Nav />
        <HeroSwiper showSlogans={true} />
      </header>
      <TabNavigationBar storageKey="home_wallpapers" />
      <BottomNav />
      <Footer />
    </>
  );
}
export default Home;