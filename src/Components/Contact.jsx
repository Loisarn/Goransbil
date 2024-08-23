import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <div className="contact-info">
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <div className="info">
                <span className="title">Adress:</span>
                <p>
                  Örkelljungavägen 529,
                  <br /> 266 93 Munka-ljungby
                </p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone-alt"></i>
              <div className="info">
                <span className="title">Telefon:</span>
                <p>
                  <a href="tel:0708441653">070-844 16 53</a>
                </p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <div className="info">
                <span className="title">Mail:</span>
                <p>
                  <a href="mailto:goransbilar@gmail.com">
                    goransbilar@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="opening-hours border p-3">
            <div className="contact-item">
              <i className="fas fa-clock"></i>
              <div className="info">
                <span className="title">Öppettider:</span>
                <ul className="list-unstyled">
                  <li>Måndag: 08:00–17:00</li>
                  <li>Tisdag: 08:00–17:00</li>
                  <li>Onsdag: 08:00–17:00</li>
                  <li>Torsdag: 08:00–17:00</li>
                  <li>Fredag: 08:00–17:00</li>
                  <li>Lördag: 10:00–15:00</li>
                  <li>Söndag: Stängt</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
