import { useCallback, useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
import About from "../About/About.jsx";
import Main from "../Main/Main.jsx";
import SearchForm from "../SearchForm/SearchForm";
import SavedNews from "../SavedNews/SavedNews.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import SuccessModal from "../SuccessModal/SuccessModal.jsx";
import MobileMenuModal from "../MobileMenuModal/MobileMenuModal.jsx";

import UserContext from "../../context/UserContext.jsx";
import ProtectedRoute from "../ProtectedRoute.jsx";

import getNews from "../../utils/newsApi.js";
import { signIn, signUp, checkToken } from "../../utils/auth.js";
import { getArticles, saveArticles } from "../../utils/api.jsx"; 

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

  const [savedArticles, setSavedArticles] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

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

    getNews(query)
      .then((articles) => {
        setArticles(articles || []);
        setIsSearchComplete(true);
      })
      .catch((err) => {
        console.error("Error fetching news:", err);
        setIsSearchError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogin = useCallback(async ({ email, password }) => {
    try {
      const { token } = await signIn(email, password);
      localStorage.setItem("jwt", token);
      const userData = { name: "Test User", email };
      setCurrentUser(userData);
      setLoggedIn(true);
      closeAllModals();

      const articles = await getArticles();
      setSavedArticles(articles);
    } catch (err) {
      console.error("Login error:", err);
    }
  }, []);

  const handleLogout = () => {
    setLoggedIn(false);
    setCurrentUser({ name: "", email: "" });
    localStorage.removeItem("jwt");
    setSavedArticles([]);
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

  const handleDeleteArticle = async (article) => {
    const updated = await saveArticles({ _id: article._id, isSaved: false, article });
    if (updated) {
      setSavedArticles((prev) =>
        prev.filter((a) => a.url !== article.url)
      );
    }
  };

  const handleSaveArticle = async (article) => {
    const updated = await saveArticles({ _id: article._id, isSaved: true, article });
    if (updated) {
      setSavedArticles((prev) => [...prev, article]);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token && loggedIn) {
      const userData = { name: "Test User", email: "user@example.com" };
      setCurrentUser(userData);
      getArticles().then(setSavedArticles);
    }
  }, [loggedIn]);

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
        <div className="page container">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <>
                  <div className="hero-background">
                    <Header
                      onLoginClick={handleLoginClick}
                      onRegisterClick={handleRegisterClick}
                      onLogout={handleLogout}
                      onMobileMenuClick={handleMobileMenuClick}
                      loggedIn={loggedIn}
                    />
                    <section className="hero">
                      <h1 className="hero__title">
                        What&apos;s going on in the world?
                      </h1>
                      <p className="hero__subtitle">
                        Find the latest news on any topic and save them in your
                        personal account.
                      </p>
                      <SearchForm
                        isLoading={isLoading}
                        onSearchSubmit={handleSearchSubmit}
                      />
                    </section>
                  </div>

                  <Main
                    isLoading={isLoading}
                    onSearchSubmit={handleSearchSubmit}
                    articles={articles}
                    isSearchComplete={isSearchComplete}
                    isSearchError={isSearchError}
                    isLoggedIn={loggedIn}
                  />

                  <About />
                </>
              }
            />

            <Route
              path="/saved-news"
              element={
                <ProtectedRoute>
                  <>
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
                      handleDeleteArticle={handleDeleteArticle}
                      handleSaveArticle={handleSaveArticle}
                      savedArticles={savedArticles}
                    />
                  </>
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
