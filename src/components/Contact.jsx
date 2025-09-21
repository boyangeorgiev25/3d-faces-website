import { useState } from 'react'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you for your inquiry! We will contact you soon.')
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    })
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2>Get In Touch</h2>
        <p>Ready to create your 3D figure? Contact us for a quote!</p>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <h3>📧 Email</h3>
              <p>info@3dfaceprints.com</p>
            </div>
            <div className="contact-item">
              <h3>📱 Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="contact-item">
              <h3>📍 Location</h3>
              <p>123 Creative Street<br />Design City, DC 12345</p>
            </div>
            <div className="contact-item">
              <h3>⏰ Hours</h3>
              <p>Mon - Fri: 9AM - 6PM<br />Sat: 10AM - 4PM</p>
            </div>
          </div>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value="">Select a Service</option>
                <option value="photo-to-3d">Photo to 3D Figure</option>
                <option value="custom-design">Custom Design</option>
                <option value="bulk-orders">Bulk Orders</option>
              </select>
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Tell us about your project..."
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact