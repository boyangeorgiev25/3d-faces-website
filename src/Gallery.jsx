import "./Gallery.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

function Gallery() {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'bg';
  });
  const [activeFilter, setActiveFilter] = useState('all');
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
      galleryTitle: "Gallery",
      galleryDesc: "My 3D face modeling projects",
      categories: "Categories",
      all: "All",
      portraits: "Portraits",
      characters: "Characters",
      realistic: "Realistic",
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
      galleryTitle: "Галерия",
      galleryDesc: "Моите 3D проекти за лица",
      categories: "Категории",
      all: "Всички",
      portraits: "Портрети",
      characters: "Персонажи",
      realistic: "Реалистични",
      login: "Вход",
      logout: "Изход",
      welcome: "Добре дошли"
    }
  };

  const t = translations[language];

  const projects = [
    { 
      id: 1, 
      category: 'portraits', 
      title: language === 'bg' ? 'Портретен модел 1' : 'Portrait Model 1',
      description: language === 'bg' ? 'Детайлен портрет с реалистични черти' : 'Detailed portrait with realistic features'
    },
    { 
      id: 2, 
      category: 'characters', 
      title: language === 'bg' ? 'Фентъзи персонаж' : 'Fantasy Character',
      description: language === 'bg' ? 'Мистичен персонаж за игра' : 'Mystical game character design'
    },
    { 
      id: 3, 
      category: 'realistic', 
      title: language === 'bg' ? 'Реалистично лице' : 'Realistic Face',
      description: language === 'bg' ? 'Фотореалистично човешко лице' : 'Photorealistic human face'
    },
    { 
      id: 4, 
      category: 'portraits', 
      title: language === 'bg' ? 'Портретен модел 2' : 'Portrait Model 2',
      description: language === 'bg' ? 'Професионален портрет' : 'Professional portrait study'
    },
    { 
      id: 5, 
      category: 'characters', 
      title: language === 'bg' ? 'Игрови персонаж' : 'Game Character',
      description: language === 'bg' ? 'Воин за видео игра' : 'Warrior for video game'
    },
    { 
      id: 6, 
      category: 'realistic', 
      title: language === 'bg' ? 'Човешки модел' : 'Human Model',
      description: language === 'bg' ? 'Анатомично точен модел' : 'Anatomically accurate model'
    },
    { 
      id: 7, 
      category: 'characters', 
      title: language === 'bg' ? 'Научнофантастичен персонаж' : 'Sci-Fi Character',
      description: language === 'bg' ? 'Футуристичен дизайн' : 'Futuristic character design'
    },
    { 
      id: 8, 
      category: 'realistic', 
      title: language === 'bg' ? 'Професионален портрет' : 'Professional Portrait',
      description: language === 'bg' ? 'Бизнес портрет' : 'Business portrait model'
    },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

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
              <Link to="/#portfolio" className="nav-link">{t.portfolio}</Link>
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

      <section className="gallery-hero">
        <div className="gallery-hero-content">
          <h1>{t.galleryTitle}</h1>
          <p>{t.galleryDesc}</p>
        </div>
      </section>

      <section className="gallery-content">
        <div className="gallery-filters">
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              {t.all}
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'portraits' ? 'active' : ''}`}
              onClick={() => setActiveFilter('portraits')}
            >
              {t.portraits}
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'characters' ? 'active' : ''}`}
              onClick={() => setActiveFilter('characters')}
            >
              {t.characters}
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'realistic' ? 'active' : ''}`}
              onClick={() => setActiveFilter('realistic')}
            >
              {t.realistic}
            </button>
          </div>
        </div>

        <div className="gallery-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="gallery-item">
              <div className="category-sticker">
                {project.category === 'portraits' && (language === 'bg' ? 'Портрети' : 'Portraits')}
                {project.category === 'characters' && (language === 'bg' ? 'Персонажи' : 'Characters')}
                {project.category === 'realistic' && (language === 'bg' ? 'Реалистични' : 'Realistic')}
              </div>
              <img src="/homeIng1.png" alt={project.title} />
              <div className="project-info">
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Gallery;