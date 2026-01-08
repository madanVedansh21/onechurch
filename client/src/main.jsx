import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ForumProvider } from "./context/ForumContext.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ForumProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </ForumProvider>
    </AuthProvider>
  </StrictMode>
);
