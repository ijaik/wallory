import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router"],
          animations: ["gsap", "@gsap/react"],
          swiper: ["swiper", "swiper/modules"],
          lenis: ["lenis"],
        },
      },
    },
  },
});