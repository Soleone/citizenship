import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { themeOptions } from "virtual:theme-options";
import { ThemeProvider } from "@/components/soleone/theme";
import { THEME_STORAGE_KEY } from "@/theme/config";
import App from "./App";
import "./index.css";

// Vite's base path doubles as the router's basename, so the app keeps routing
// when it is served from a subdirectory instead of the domain root.
const basename = import.meta.env.BASE_URL.replace(/\/+$/, "") || "/";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider themes={themeOptions} storageKey={THEME_STORAGE_KEY}>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
