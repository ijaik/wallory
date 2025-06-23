import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./Contexts/ThemeContext.jsx";
import { LenisProvider } from "./Contexts/LenisContext.jsx";
const registerServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
  }
};
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <LenisProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LenisProvider>
    </ThemeProvider>
  </StrictMode>
);
registerServiceWorker();