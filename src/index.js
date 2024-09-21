import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals.js";
import { BrowserRouter as Router } from "react-router-dom";
import { MenuProvider } from "./contexts/MenuContext.js";
import { AuthProvider } from "./contexts/AuthContext.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <MenuProvider>
          <App />
        </MenuProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
