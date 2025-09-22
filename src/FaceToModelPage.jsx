import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import FaceToModel from "./components/FaceToModel";
import "./Gallery.css"; // Reuse Gallery styles for consistency

function FaceToModelPage() {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'bg';
  });
  const [showUserPopup, setShowUserPopup] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const translations = {
    en: {
      brand: "3D Faces",
      home: "Home",
      about: "About",
      portfolio: "Portfolio",
      contact: "Contact",
      gallery: "Gallery",
      faceToModel: "Face to 3D Model",
      uploadDescription: "Upload a clear photo of a face to generate a 3D model",
      dragDropText: "Drag and drop an image here, or click to select",
      selectImage: "Select Image",
      generating: "Generating 3D Model...",
      generate: "Generate 3D Model",
      downloadModel: "Download 3D Model",
      tryAnother: "Try Another Image",
      loginRequired: "Please log in to use this feature",
      processing: "Processing your image...",
      almostDone: "Almost done...",
      generationComplete: "Generation complete!",
      login: "Login",
      logout: "Logout",
      welcome: "Welcome"
    },
    bg: {
      brand: "3D Лица",
      home: "Начало",
      about: "За мен",
      portfolio: "Портфолио",
      contact: "Контакти",
      gallery: "Галерия",
      faceToModel: "Лице към 3D модел",
      uploadDescription: "Качете ясна снимка на лице, за да генерирате 3D модел",
      dragDropText: "Плъзнете и пуснете изображение тук, или кликнете за избор",
      selectImage: "Избери изображение",
      generating: "Генериране на 3D модел...",
      generate: "Генерирай 3D модел",
      downloadModel: "Изтегли 3D модел",
      tryAnother: "Опитай друго изображение",
      loginRequired: "Моля, влезте в акаунта си, за да използвате тази функция",
      processing: "Обработване на вашето изображение...",
      almostDone: "Почти готово...",
      generationComplete: "Генерирането е завършено!",
      login: "Вход",
      logout: "Изход",
      welcome: "Добре дошли"
    }
  };

  const t = translations[language];

  return (
    <div className="Gallery">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <span className="brand-icon">⚡</span>
            <span className="brand-text">{t.brand}</span>
          </div>
          
          <div className="nav-center">
            <div className="nav-links">
              <Link to="/" className="nav-link">{t.home}</Link>
              <Link to="/#about" className="nav-link">{t.about}</Link>
              <Link to="/gallery" className="nav-link">{t.gallery}</Link>
              <Link to="/face-to-model" className="nav-link active">{t.faceToModel}</Link>
              <Link to="/#contact" className="nav-link">{t.contact}</Link>
            </div>
          </div>

          <div className="nav-right">
            <button 
              className="lang-toggle" 
              onClick={() => handleLanguageChange(language === 'en' ? 'bg' : 'en')}
            >
              {language === 'en' ? 'BG' : 'EN'}
            </button>
            
            {isAuthenticated ? (
              <div className="user-profile">
                <div className="user-display" onClick={() => setShowUserPopup(!showUserPopup)}>
                  <div className="user-avatar">
                    <span>{user?.username?.[0]?.toUpperCase() || 'U'}</span>
                  </div>
                  <span className="user-name">{user?.username || 'User'}</span>
                </div>
                
                {showUserPopup && (
                  <div className="user-popup">
                    <div className="user-popup-content">
                      <div className="user-info-section">
                        <div className="user-avatar-large">
                          <span>{user?.username?.[0]?.toUpperCase() || 'U'}</span>
                        </div>
                        <div className="user-details">
                          <h3>{user?.username || 'User'}</h3>
                          <p>{user?.email || 'user@example.com'}</p>
                          <span className="user-status">Online</span>
                        </div>
                      </div>
                      <button className="logout-button-popup" onClick={() => {
                        logout();
                        setShowUserPopup(false);
                      }}>
                        <span className="logout-icon">🚪</span>
                        {t.logout}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/" className="login-btn">
                <span className="login-icon">👤</span>
                {t.login}
              </Link>
            )}
          </div>
        </div>
      </nav>

      <FaceToModel translations={t} language={language} />
    </div>
  );
}

export default FaceToModelPage;