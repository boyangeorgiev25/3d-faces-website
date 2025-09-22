import "./App.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import AuthForm from "./components/LoginForm";
import ChatBot from "./components/ChatBot";

function App() {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "bg";
  });
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const translations = {
    en: {
      brand: "3D Faces",
      home: "Home",
      about: "About",
      portfolio: "Portfolio",
      contact: "Contact",
      heroTitle: "Professional 3D Face Modeling",
      heroDesc:
        "Creating stunning, realistic 3D faces with cutting-edge technology",
      viewPortfolio: "View Portfolio",
      masterTitle: "Master of 3D Artistry",
      masterDesc:
        "With years of experience in 3D modeling and digital art, I specialize in creating photorealistic human faces that capture emotion, personality, and detail.",
      featuredWork: "Featured Work",
      characterPortrait: "Character Portrait",
      realisticHuman: "Realistic Human",
      fantasyCharacter: "Fantasy Character",
      digitalAvatar: "Digital Avatar",
      createTogether: "Let's Create Together",
      contactDesc:
        "Ready to bring your vision to life? Get in touch and let's discuss your project.",
      availableFreelance: "Available for freelance",
      yourName: "Your Name",
      yourEmail: "Your Email",
      tellProject: "Tell me about your project",
      sendMessage: "Send Message",
      login: "Login",
      logout: "Logout",
      welcome: "Welcome",
      signup: "Sign Up",
      username: "Username",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      cancel: "Cancel",
      loginFailed: "Login failed. Please check your credentials.",
      signupFailed: "Signup failed. Please try again.",
      passwordsDontMatch: "Passwords don't match.",
      loggingIn: "Logging in...",
      signingUp: "Signing up...",
      noAccount: "Don't have an account?",
      haveAccount: "Already have an account?",
      chatTitle: "AI Assistant",
      chatWelcome: "Hello! I'm your AI assistant. How can I help you today?",
      chatPlaceholder: "Type your message...",
      chatError: "Sorry, I encountered an error. Please try again.",
      send: "Send",
    },
    bg: {
      brand: "3D Лица",
      home: "Начало",
      about: "За мен",
      portfolio: "Портфолио",
      contact: "Контакти",
      heroTitle: "Професионално 3D моделиране на лица",
      heroDesc:
        "Създавам зашеметяващи, реалистични 3D лица с най-съвременни технологии",
      viewPortfolio: "Виж портфолио",
      masterTitle: "Майстор на 3D изкуството",
      masterDesc:
        "С години опит в 3D моделирането и цифровото изкуство, специализирам в създаването на фотореалистични човешки лица, които улавят емоции, личност и детайли.",
      featuredWork: "Избрани работи",
      characterPortrait: "Портрет на персонаж",
      realisticHuman: "Реалистичен човек",
      fantasyCharacter: "Фентъзи персонаж",
      digitalAvatar: "Цифров аватар",
      createTogether: "Нека творим заедно",
      contactDesc:
        "Готови ли сте да оживеете вашата визия? Свържете се с мен и нека обсъдим вашия проект.",
      availableFreelance: "Достъпен за фрийланс проекти",
      yourName: "Вашето име",
      yourEmail: "Вашия имейл",
      tellProject: "Разкажете ми за вашия проект",
      sendMessage: "Изпрати съобщение",
      login: "Вход",
      logout: "Изход",
      welcome: "Добре дошли",
      signup: "Регистрация",
      username: "Потребителско име",
      email: "Имейл",
      password: "Парола",
      confirmPassword: "Потвърди парола",
      cancel: "Отказ",
      loginFailed: "Неуспешен вход. Моля, проверете данните си.",
      signupFailed: "Неуспешна регистрация. Моля, опитайте отново.",
      passwordsDontMatch: "Паролите не съвпадат.",
      loggingIn: "Влизане...",
      signingUp: "Регистриране...",
      noAccount: "Нямате акаунт?",
      haveAccount: "Вече имате акаунт?",
      chatTitle: "AI Асистент",
      chatWelcome:
        "Здравейте! Аз съм вашият AI асистент. Как мога да ви помогна днес?",
      chatPlaceholder: "Напишете съобщението си...",
      chatError: "Съжалявам, възникна грешка. Моля, опитайте отново.",
      send: "Изпрати",
    },
  };

  const t = translations[language];
  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <span className="brand-icon">⚡</span>
            <span className="brand-text">{t.brand}</span>
          </div>

          <div className="nav-center">
            <div className="nav-links">
              <a href="#hero" className="nav-link">
                {t.home}
              </a>
              <a href="#about" className="nav-link">
                {t.about}
              </a>
              <a href="#portfolio" className="nav-link">
                {t.portfolio}
              </a>
              <Link to="/face-to-model" className="nav-link">
                {language === "bg" ? "3D Генератор" : "3D Generator"}
              </Link>
              <a href="#contact" className="nav-link">
                {t.contact}
              </a>
            </div>
          </div>

          <div className="nav-right">
            <button
              className="lang-toggle"
              onClick={() =>
                handleLanguageChange(language === "en" ? "bg" : "en")
              }
            >
              {language === "en" ? "BG" : "EN"}
            </button>

            {isAuthenticated ? (
              <div className="user-profile">
                <div
                  className="user-display"
                  onClick={() => setShowUserPopup(!showUserPopup)}
                >
                  <div className="user-avatar">
                    <span>{user?.username?.[0]?.toUpperCase() || "U"}</span>
                  </div>
                  <span className="user-name">{user?.username || "User"}</span>
                </div>

                {showUserPopup && (
                  <div className="user-popup">
                    <div className="user-popup-content">
                      <div className="user-info-section">
                        <div className="user-avatar-large">
                          <span>
                            {user?.username?.[0]?.toUpperCase() || "U"}
                          </span>
                        </div>
                        <div className="user-details">
                          <h3>{user?.username || "User"}</h3>
                          <p>{user?.email || "user@example.com"}</p>
                          <span className="user-status">Online</span>
                        </div>
                      </div>
                      <button
                        className="logout-button-popup"
                        onClick={() => {
                          logout();
                          setShowUserPopup(false);
                        }}
                      >
                        <span className="logout-icon">🚪</span>
                        {t.logout}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                className="login-btn"
                onClick={() => setShowAuthForm(true)}
              >
                {t.login}
              </button>
            )}
          </div>
        </div>
      </nav>

      <section id="hero" className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">{t.heroTitle}</h1>
            <p className="hero-description">{t.heroDesc}</p>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">
                  {language === "bg" ? "Проекта" : "Projects"}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">
                  {language === "bg" ? "Качество" : "Quality"}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">
                  {language === "bg" ? "Поддръжка" : "Support"}
                </span>
              </div>
            </div>

            <div className="hero-actions">
              <Link to="/gallery" className="primary-btn">
                <span>{t.viewPortfolio}</span>
                <span className="btn-arrow">→</span>
              </Link>
              <button
                className="secondary-btn"
                onClick={() => setShowAuthForm(true)}
              >
                <span className="btn-icon">💬</span>
                {language === "bg" ? "Започни проект" : "Start Project"}
              </button>
            </div>

            <div className="hero-features">
              <div className="feature-item">
                <div className="feature-icon">⚡</div>
                <div className="feature-text">
                  <h4>
                    {language === "bg" ? "Бърза доставка" : "Fast Delivery"}
                  </h4>
                  <p>{language === "bg" ? "До 7 дни" : "Within 7 days"}</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🎯</div>
                <div className="feature-text">
                  <h4>
                    {language === "bg"
                      ? "Индивидуален подход"
                      : "Custom Approach"}
                  </h4>
                  <p>
                    {language === "bg"
                      ? "Според нуждите ви"
                      : "Tailored to you"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-container">
              <div className="main-showcase">
                <img
                  src="/homeIng1.png"
                  alt="3D Face"
                  className="showcase-image"
                />
                <div className="showcase-glow"></div>
              </div>

              <div className="floating-cards">
                <div className="floating-card card-1">
                  <div className="card-icon">🎨</div>
                  <div className="card-text">3D Modeling</div>
                </div>
                <div className="floating-card card-2">
                  <div className="card-icon">✨</div>
                  <div className="card-text">Rendering</div>
                </div>
                <div className="floating-card card-3">
                  <div className="card-icon">🎬</div>
                  <div className="card-text">Animation</div>
                </div>
              </div>

              <div className="geometric-elements">
                <div className="geo-element geo-1"></div>
                <div className="geo-element geo-2"></div>
                <div className="geo-element geo-3"></div>
                <div className="geo-element geo-4"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="about-container">
          <div className="about-text">
            <h2>{t.masterTitle}</h2>
            <p>{t.masterDesc}</p>
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
            <img
              src="/homeIng1.png"
              alt="Portfolio Item"
              className="portfolio-image-content"
            />
            <h3>{t.characterPortrait}</h3>
          </div>
          <div className="portfolio-item">
            <img
              src="/homeIng1.png"
              alt="Portfolio Item"
              className="portfolio-image-content"
            />
            <h3>{t.realisticHuman}</h3>
          </div>
          <div className="portfolio-item">
            <img
              src="/homeIng1.png"
              alt="Portfolio Item"
              className="portfolio-image-content"
            />
            <h3>{t.fantasyCharacter}</h3>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link to="/gallery" className="cta-button">
            {language === "bg" ? "Галерия" : "Gallery"}
          </Link>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-container">
          <div className="contact-info">
            <h2>{t.createTogether}</h2>
            <p>{t.contactDesc}</p>
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

      {showAuthForm && (
        <AuthForm onClose={() => setShowAuthForm(false)} translations={t} />
      )}

      {isAuthenticated && (
        <>
          <button
            className="chat-fab"
            onClick={() => setShowChat(true)}
            title={t.chatTitle}
          >
            💬
          </button>

          <ChatBot
            isOpen={showChat}
            onClose={() => setShowChat(false)}
            translations={t}
            language={language}
          />
        </>
      )}
    </div>
  );
}

export default App;
