import "./Gallery.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function Gallery() {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'bg';
  });
  const [activeFilter, setActiveFilter] = useState('all');

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
      realistic: "Realistic"
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
      realistic: "Реалистични"
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
        <div className="nav-brand">{t.brand}</div>
        <div className="nav-links">
          <Link to="/">{t.home}</Link>
          <Link to="/#about">{t.about}</Link>
          <Link to="/#portfolio">{t.portfolio}</Link>
          <Link to="/#contact">{t.contact}</Link>
          <button 
            className="lang-button" 
            onClick={() => handleLanguageChange(language === 'en' ? 'bg' : 'en')}
          >
            {language === 'en' ? 'BG' : 'EN'}
          </button>
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