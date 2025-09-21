import { useState } from 'react'
import './Gallery.css'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)

  const galleryItems = [
    { id: 1, title: "Portrait Figure", category: "Portrait" },
    { id: 2, title: "Family Set", category: "Family" },
    { id: 3, title: "Pet & Owner", category: "Pet" },
    { id: 4, title: "Wedding Couple", category: "Wedding" },
    { id: 5, title: "Business Executive", category: "Professional" },
    { id: 6, title: "Children's Set", category: "Kids" },
  ]

  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <h2>Our 3D Creations</h2>
        <p>Explore our collection of personalized 3D printed figures</p>
        
        <div className="gallery-grid">
          {galleryItems.map((item) => (
            <div 
              key={item.id} 
              className="gallery-item"
              onClick={() => setSelectedImage(item)}
            >
              <div className="gallery-placeholder">
                <span>{item.title}</span>
                <div className="category-tag">{item.category}</div>
              </div>
              <h3>{item.title}</h3>
            </div>
          ))}
        </div>

        {selectedImage && (
          <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setSelectedImage(null)}>×</button>
              <div className="modal-image">
                <span>{selectedImage.title}</span>
              </div>
              <h3>{selectedImage.title}</h3>
              <p>Category: {selectedImage.category}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Gallery