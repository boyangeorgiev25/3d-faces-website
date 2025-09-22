import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Gallery from './Gallery.jsx'
import FaceToModelPage from './FaceToModelPage.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/face-to-model" element={<FaceToModelPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  </StrictMode>,
)
