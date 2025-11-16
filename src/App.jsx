import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Explore from "./pages/Explore.jsx";
import Customize from "./pages/Customize.jsx";
import NotFound from "./pages/NotFound.jsx";
import Intro from "./components/Intro.jsx";
import Toast from "./components/Toast.jsx";
import { ToastProvider, useToast } from "./contexts/ToastContext.jsx";
function AppContent() {
  const [showIntro, setShowIntro] = useState(false);
  const {
    showDownloadToast,
    showInstallToast,
    deferredPrompt,
    isInstalled,
    handleCloseDownloadToast,
    handleCloseInstallToast,
    handleInstallClick,
    triggerToastsAfterIntro,
  } = useToast();
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
          <Route path="/customize" element={<Customize />} />
          <Route path="*" element={<NotFound />} />
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