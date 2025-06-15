import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";

import App from "./Components/App/App";
import Main from "./Components/Main/Main";
import SavedNews from "./Components/SavedNews/SavedNews";
import ProtectedRoute from "./Components/ProtectedRoute";

import "./index.css";

function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Main />} />
          <Route
            path="saved-news"
            element={<ProtectedRoute element={<SavedNews />} />}
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
