import "./App.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function App() {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'bg';
  });

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
      heroTitle: "Professional 3D Face Modeling",
      heroDesc: "Creating stunning, realistic 3D faces with cutting-edge technology",
      viewPortfolio: "View Portfolio",
      masterTitle: "Master of 3D Artistry",
      masterDesc: "With years of experience in 3D modeling and digital art, I specialize in creating photorealistic human faces that capture emotion, personality, and detail.",
      featuredWork: "Featured Work",
      characterPortrait: "Character Portrait",
      realisticHuman: "Realistic Human",
      fantasyCharacter: "Fantasy Character",
      digitalAvatar: "Digital Avatar",
      createTogether: "Let's Create Together",
      contactDesc: "Ready to bring your vision to life? Get in touch and let's discuss your project.",
      availableFreelance: "Available for freelance",
      yourName: "Your Name",
      yourEmail: "Your Email",
      tellProject: "Tell me about your project",
      sendMessage: "Send Message"
    },
    bg: {
      brand: "3D Лица",
      home: "Начало",
      about: "За мен",
      portfolio: "Портфолио",
      contact: "Контакти",
      heroTitle: "Професионално 3D моделиране на лица",
      heroDesc: "Създавам зашеметяващи, реалистични 3D лица с най-съвременни технологии",
      viewPortfolio: "Виж портфолио",
      masterTitle: "Майстор на 3D изкуството",
      masterDesc: "С години опит в 3D моделирането и цифровото изкуство, специализирам в създаването на фотореалистични човешки лица, които улавят емоции, личност и детайли.",
      featuredWork: "Избрани работи",
      characterPortrait: "Портрет на персонаж",
      realisticHuman: "Реалистичен човек",
      fantasyCharacter: "Фентъзи персонаж",
      digitalAvatar: "Цифров аватар",
      createTogether: "Нека творим заедно",
      contactDesc: "Готови ли сте да оживеете вашата визия? Свържете се с мен и нека обсъдим вашия проект.",
      availableFreelance: "Достъпен за фрийланс проекти",
      yourName: "Вашето име",
      yourEmail: "Вашия имейл",
      tellProject: "Разкажете ми за вашия проект",
      sendMessage: "Изпрати съобщение"
    }
  };

  const t = translations[language];
  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-brand">{t.brand}</div>
        <div className="nav-links">
          <a href="#hero">{t.home}</a>
          <a href="#about">{t.about}</a>
          <a href="#portfolio">{t.portfolio}</a>
          <a href="#contact">{t.contact}</a>
          <button 
            className="lang-button" 
            onClick={() => handleLanguageChange(language === 'en' ? 'bg' : 'en')}
          >
            {language === 'en' ? 'BG' : 'EN'}
          </button>
        </div>
      </nav>

      <section id="hero" className="hero-section">
        <div className="hero-content">
          <h1>{t.heroTitle}</h1>
          <p>
            {t.heroDesc}
          </p>
          <div className="hero-benefits">
            <div className="benefit">
              <span>⚡</span>
              <span>{language === 'bg' ? 'Бърза доставка' : 'Fast Delivery'}</span>
            </div>
            <div className="benefit">
              <span>💎</span>
              <span>{language === 'bg' ? 'Премиум качество' : 'Premium Quality'}</span>
            </div>
            <div className="benefit">
              <span>🎯</span>
              <span>{language === 'bg' ? 'Индивидуален подход' : 'Custom Approach'}</span>
            </div>
          </div>
          <Link to="/gallery" className="cta-button">{t.viewPortfolio}</Link>
        </div>
        <div className="hero-visual">
          <div className="geometric-shapes">
            <div className="shape triangle"></div>
            <div className="shape rectangle"></div>
            <div className="shape hexagon"></div>
            <div className="shape parallelogram"></div>
            <div className="shape diamond"></div>
            <div className="shape pentagon"></div>
          </div>
          <div className="face-showcase">
            <img src="/homeIng1.png" alt="3D Face" className="face-image" />
          </div>
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="about-container">
          <div className="about-text">
            <h2>{t.masterTitle}</h2>
            <p>
              {t.masterDesc}
            </p>
            <div className="skills">
              <span>Blender</span>
              <span>ZBrush</span>
              <span>Maya</span>
              <span>Substance Painter</span>
            </div>
          </div>
          <div className="about-image">
            <img src="/section2.png" alt="3D Art" className="section-image" />
          </div>
        </div>
      </section>

      <section id="portfolio" className="portfolio-section">
        <h2>{t.featuredWork}</h2>
        <div className="portfolio-grid">
          <div className="portfolio-item">
            <img src="/homeIng1.png" alt="Portfolio Item" className="portfolio-image-content" />
            <h3>{t.characterPortrait}</h3>
          </div>
          <div className="portfolio-item">
            <img src="/homeIng1.png" alt="Portfolio Item" className="portfolio-image-content" />
            <h3>{t.realisticHuman}</h3>
          </div>
          <div className="portfolio-item">
            <img src="/homeIng1.png" alt="Portfolio Item" className="portfolio-image-content" />
            <h3>{t.fantasyCharacter}</h3>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/gallery" className="cta-button">{language === 'bg' ? 'Галерия' : 'Gallery'}</Link>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-container">
          <div className="contact-info">
            <h2>{t.createTogether}</h2>
            <p>
              {t.contactDesc}
            </p>
            <div className="contact-details">
              <div className="contact-item">
                <span>📧</span>
                <span>hello@3dfaces.com</span>
              </div>
              <div className="contact-item">
                <span>💼</span>
                <span>{t.availableFreelance}</span>
              </div>
            </div>
          </div>
          <div className="contact-form">
            <form>
              <input type="text" placeholder={t.yourName} />
              <input type="email" placeholder={t.yourEmail} />
              <textarea placeholder={t.tellProject}></textarea>
              <button type="submit">{t.sendMessage}</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
