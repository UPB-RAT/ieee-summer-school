import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ReactGA from "react-ga4";

// const GA_ID = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;

// if (!GA_ID) {
//   console.warn("GA not configured");
// }
// // Initialize Google Analytics 4
// ReactGA.initialize(GA_ID ?? 'G-XXXXXXXXXX');

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
