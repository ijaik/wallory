import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./Contexts/ThemeContext.jsx";
import { LenisProvider } from "./Contexts/LenisContext.jsx";
const About = lazy(() => import("./Pages/About.jsx"));
const Explore = lazy(() => import("./Pages/Explore.jsx"));
const NoPage = lazy(() => import("./Pages/NoPage.jsx"));
const registerServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("Service Worker registered:", registration);
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  }
};
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <LenisProvider>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/about" element={<About />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="*" element={<NoPage />} />
            </Routes>
        </BrowserRouter>
      </LenisProvider>
    </ThemeProvider>
  </StrictMode>
);
registerServiceWorker();