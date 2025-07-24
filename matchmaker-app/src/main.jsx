import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "@propelauth/react";

createRoot(document.getElementById("root")).render(
  <AuthProvider authUrl={import.meta.env.VITE_PROPELAUTH_URL}>
    <App />
  </AuthProvider>
);
