import './Services.css'

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Photo to 3D Figure",
      description: "Transform your favorite photos into detailed 3D printed figures",
      features: ["High-quality scanning", "Multiple sizes available", "Color printing options"],
      price: "Starting from $49"
    },
    {
      id: 2,
      title: "Custom Design",
      description: "Work with our designers to create unique, personalized figures",
      features: ["Professional consultation", "Custom poses", "Detailed finishing"],
      price: "Starting from $99"
    },
    {
      id: 3,
      title: "Bulk Orders",
      description: "Perfect for events, weddings, or corporate gifts",
      features: ["Volume discounts", "Fast turnaround", "Custom packaging"],
      price: "Contact for pricing"
    }
  ]

  return (
    <section id="services" className="services">
      <div className="container">
        <h2>Our Services</h2>
        <p>Choose the perfect service for your 3D printing needs</p>
        
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">
                <span>3D</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul className="features-list">
                {service.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <div className="service-price">{service.price}</div>
              <button className="service-btn">Choose This Service</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services