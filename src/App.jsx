import { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route } from "react-router";
import Intro from "./Components/Intro.jsx";
import Toast from "./Components/Toast.jsx";
import { ToastProvider, useToast } from "./Contexts/ToastContext.jsx";
import Home from "./Pages/Home.jsx";
const About = lazy(() => import("./Pages/About.jsx"));
const Explore = lazy(() => import("./Pages/Explore.jsx"));
const NoPage = lazy(() => import("./Pages/NoPage.jsx"));
const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    </div>
  );
};
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
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </Suspense>
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