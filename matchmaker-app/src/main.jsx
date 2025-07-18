import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "@propelauth/react";
import WaitingPage from "./pages/WaitingPage/WaitingPage.jsx";
// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );

createRoot(document.getElementById("root")).render(
  <AuthProvider authUrl={import.meta.env.VITE_AUTH_URL}>
    <App />
  </AuthProvider>
);
