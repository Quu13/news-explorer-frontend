import { useCallback, useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
import About from "../About/About.jsx";
import Main from "../Main/Main.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import SuccessModal from "../SuccessModal/SuccessModal.jsx";
import MobileMenuModal from "../MobileMenuModal/MobileMenuModal.jsx";

import UserContext from "../../context/UserContext.jsx";
import ProtectedRoute from "../ProtectedRoute.jsx";

import { signIn, signUp, checkToken } from "../../utils/auth.js";

import "./App.css";

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: "", email: "" });

  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [isSearchComplete, setIsSearchComplete] = useState(false);
  const [isSearchError, setIsSearchError] = useState(false);

  const [savedArticles, setSavedArticles] = useState([
    { id: 1, keyword: "Politics", title: "Article 1" },
    { id: 2, keyword: "Economy", title: "Article 2" },
    { id: 3, keyword: "Politics", title: "Article 3" },
  ]);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginClick = () => setIsLoginModalOpen(true);
  const handleRegisterClick = () => setIsRegisterModalOpen(true);
  const handleSuccessClick = () => setIsSuccessModalOpen(true);
  const handleMobileMenuClick = () => setIsMobileMenuOpen(true);
  const closeAllModals = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
    setIsSuccessModalOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleSearchSubmit = (query) => {
    setIsLoading(true);
    setIsSearchComplete(false);
    setIsSearchError(false);

    setTimeout(() => {
      const mockResults = [
        {
          id: 1,
          title: "News Article 1",
          description: "Lorem ipsum dolor sit amet.",
        },
        {
          id: 2,
          title: "News Article 2",
          description: "Consectetur adipiscing elit.",
        },
      ];
      setArticles(mockResults);
      setIsLoading(false);
      setIsSearchComplete(true);
    }, 1500);
  };

  const handleLogin = useCallback(
    async ({ email, password }) => {
      try {
        const { token } = await signIn(email, password);
        localStorage.setItem("jwt", token);
        const response = await checkToken(token);
        setCurrentUser(response.data);
        setLoggedIn(true);
        closeAllModals();
        navigate("/saved-news");
      } catch (err) {
        console.error("Login error:", err);
      }
    },
    [navigate]
  );

  const handleLogout = () => {
    setLoggedIn(false);
    setCurrentUser({ name: "", email: "" });
    localStorage.removeItem("jwt");
    navigate("/");
  };

  const handleRegisterSubmit = async ({ name, email, password }) => {
    try {
      await signUp(name, email, password);
      closeAllModals();
      setIsSuccessModalOpen(true);
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((response) => {
          setCurrentUser(response.data);
          setLoggedIn(true);
        })
        .catch((err) => {
          console.error("Token validation error:", err);
        });
    }
  }, []);

  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") closeAllModals();
    };
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, isLoggedIn: loggedIn }}>
      <div className="app">
        <div className="page">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <>
                  <div className="hero-background">
                    <Header
                      onLoginClick={handleLoginClick}
                      onRegisterClick={handleRegisterClick}
                      onMobileMenuClick={handleMobileMenuClick}
                      loggedIn={loggedIn}
                    />
                    <Main
                      isLoading={isLoading}
                      onSearchSubmit={handleSearchSubmit}
                      articles={articles}
                      isSearchComplete={isSearchComplete}
                      isSearchError={isSearchError}
                    />
                  </div>
                  <About />
                </>
              }
            />
            <Route
              path="/saved-news"
              element={
                <ProtectedRoute>
                  <div className="hero-background">
                    <Header
                      onLoginClick={handleLoginClick}
                      onRegisterClick={handleRegisterClick}
                      onLogout={handleLogout}
                      loggedIn={loggedIn}
                      currentUser={currentUser}
                      isModalOpen={
                        isLoginModalOpen ||
                        isRegisterModalOpen ||
                        isSuccessModalOpen ||
                        isMobileMenuOpen
                      }
                    />
                    <SavedNews
                      isLoggedIn={loggedIn}
                      handleSignOut={handleLogout}
                      handleDeleteArticle={() => {}}
                      handleSaveArticle={() => {}}
                      savedArticles={savedArticles}
                    />
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>

          <Footer />

          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={closeAllModals}
            onSubmit={handleLogin}
            buttonText="Sign in"
            secondaryBtnText="Sign up"
            onSecondaryBtnClick={() => {
              closeAllModals();
              setTimeout(() => {
                setIsRegisterModalOpen(true);
              }, 0);
            }}
            title="Sign in"
          />

          <RegisterModal
            isOpen={isRegisterModalOpen}
            onClose={closeAllModals}
            onSubmit={handleRegisterSubmit}
            title="Sign up"
            buttonText="Sign up"
            secondaryBtnText="Sign in"
            onSecondaryBtnClick={() => {
              closeAllModals();
              setTimeout(() => {
                setIsLoginModalOpen(true);
              }, 0);
            }}
          />

          <SuccessModal
            isOpen={isSuccessModalOpen}
            onClose={closeAllModals}
            onLoginClick={handleLoginClick}
          />

          <MobileMenuModal
            isOpen={isMobileMenuOpen}
            onClose={closeAllModals}
            onLoginClick={handleLoginClick}
            onRegisterClick={handleRegisterClick}
            onLogoutClick={handleLogout}
            loggedIn={loggedIn}
          />
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
