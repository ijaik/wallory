import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import { lazy } from "react";
import Intro from "./Components/Intro";
import Home from "./Pages/Home";
import Toast from "./Components/Toast";
import { ToastProvider, useToast } from "./Contexts/ToastContext";
const About = lazy(() => import("./Pages/About.jsx"));
const Explore = lazy(() => import("./Pages/Explore.jsx"));
const NoPage = lazy(() => import("./Pages/NoPage.jsx"));
function AppContent() {
  const [showIntro, setShowIntro] = useState(false);
  const { showDownloadToast, showInstallToast, deferredPrompt, isInstalled, handleCloseDownloadToast, handleCloseInstallToast, handleInstallClick, triggerToastsAfterIntro } = useToast();
  useEffect(() => {
    const hasSeenIntro = localStorage.getItem("hasSeenIntro");
    if (!hasSeenIntro) {
      setShowIntro(true);
    }
  }, []);
  const handleIntroComplete = () => {
    localStorage.setItem("hasSeenIntro", "true");
    setShowIntro(false);
    triggerToastsAfterIntro();
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
      {showIntro ? (
        <Intro onComplete={handleIntroComplete} />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      )}
    </>
  );
}
function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
export default App;