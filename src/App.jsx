import { useState, useEffect } from "react";
import Intro from "./Components/Intro";
import Home from "./Pages/Home";

function App() {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem("hasSeenIntro");
    if (!hasSeenIntro) {
      setShowIntro(true);
    }
  }, []);

  const handleIntroComplete = () => {
    localStorage.setItem("hasSeenIntro", "true");
    setShowIntro(false);
  };

  return showIntro ? <Intro onComplete={handleIntroComplete} /> : <Home />;
}

export default App;
