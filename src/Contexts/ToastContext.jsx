import { createContext, useContext, useState, useEffect } from "react";
const ToastContext = createContext();
export function ToastProvider({ children }) {
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
    const hasSeenIntro = localStorage.getItem("hasSeenIntro");
    if (hasSeenIntro) {
      if (!hasClosedDownloadToast) {
        setShowDownloadToast(true);
      } else if (!hasClosedInstallToast && !checkIsInstalled()) {
        setShowInstallToast(true);
      }
    }
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      if (!checkIsInstalled()) {
        setDeferredPrompt(e);
        localStorage.setItem("isInstallable", "true");
      }
    };
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      localStorage.setItem("isInstallable", "false");
      setShowInstallToast(false);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
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
  const triggerToastsAfterIntro = () => {
    if (!localStorage.getItem("hasClosedDownloadToast")) {
      setShowDownloadToast(true);
    } else if (!localStorage.getItem("hasClosedInstallToast") && !isInstalled) {
      setShowInstallToast(true);
    }
  };
  return (
    <ToastContext.Provider
      value={{
        showDownloadToast,
        showInstallToast,
        deferredPrompt,
        isInstalled,
        handleCloseDownloadToast,
        handleCloseInstallToast,
        handleInstallClick,
        triggerToastsAfterIntro,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}