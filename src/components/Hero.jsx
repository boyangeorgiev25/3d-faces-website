import './Hero.css'

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
      <div className="hero-content">
        <div className="hero-badge">✨ Premium 3D Printing</div>
        <h1>
          Transform Your <span className="gradient-text">Face</span>
          <br />Into Digital <span className="gradient-text">Art</span>
        </h1>
        <p>Create stunning, lifelike 3D printed figures from your photos. Perfect for gifts, collectibles, and unforgettable keepsakes that capture every detail.</p>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">500+</span>
            <span className="stat-label">Happy Customers</span>
          </div>
          <div className="stat">
            <span className="stat-number">24hr</span>
            <span className="stat-label">Fast Delivery</span>
          </div>
          <div className="stat">
            <span className="stat-number">4.9★</span>
            <span className="stat-label">Rating</span>
          </div>
        </div>
        <div className="hero-buttons">
          <button className="btn-primary">
            <span>Start Your 3D Journey</span>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
            </svg>
          </button>
          <button className="btn-secondary">
            <span>View Gallery</span>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="hero-visual">
        <div className="main-figure">
          <div className="figure-glow"></div>
          <div className="figure-content">
            <div className="scan-lines"></div>
            <span>3D Model Preview</span>
          </div>
        </div>
        <div className="floating-elements">
          <div className="element element-1">📸</div>
          <div className="element element-2">🎨</div>
          <div className="element element-3">🖨️</div>
          <div className="element element-4">✨</div>
        </div>
      </div>
    </section>
  )
}

export default Hero