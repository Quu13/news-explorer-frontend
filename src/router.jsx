import { createBrowserRouter } from "react-router-dom";
import App from "./Components/App/App";
import Main from "./Components/Main/Main";
import SavedNews from "./Components/SavedNews/SavedNews";
import ProtectedRoute from "./Components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "/saved-news",
        element: <ProtectedRoute element={<SavedNews />} />,
      },
    ],
  },
]);

export default router;