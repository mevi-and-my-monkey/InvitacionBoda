import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock } from 'lucide-react';
import ConfirmationForm from './ConfirmationForm';
import './Invitation.css';

import img1 from '../assets/media__1775949218809.jpg'; // Pareja
import img2 from '../assets/media__1775949218836.jpg'; // Paisaje Cuyo y Pez
import img3 from '../assets/media__1775949218980.jpg'; // Mascota en traje
import img4 from '../assets/media__1775949219715.jpg'; // Mascota 2
import img5 from '../assets/media__1775949220329.jpg'; // Mascota 3

export default function Invitation({ guestName, tickets }) {
  const mapLink = "https://maps.app.goo.gl/4RfwJkoV3HnNcngL6";

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="invitation-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="scroll-content">
        
        {/* Encabezado Principal Integrado con Ilustración */}
        <motion.div className="header-card" variants={itemVariants}>
          <div className="illustration-wrapper">
            <img src={img1} alt="Pareja de novios" className="card-illustration-img" />
            <div className="fade-overlay-bottom"></div>
          </div>
          <div className="card-content main-title-content">
            <h1 className="title big-title">Alejandro &amp; Diana</h1>
            <p className="body-text" style={{marginTop: '10px'}}>Nos complace de todo corazón invitar a:</p>
            <h2 className="guest-name">{guestName}</h2>
            <p className="body-text tickets-info">Pases reservados: {tickets}</p>
          </div>
        </motion.div>

        {/* Detalles del evento (Sin ilustración superior) */}
        <motion.div className="details-card standalone-card" variants={itemVariants}>
          <div className="card-content" style={{paddingTop: '35px', marginTop: '0'}}>
            <h3 className="heading">Cuándo &amp; Dónde</h3>
            
            <div className="detail-item">
              <Calendar className="icon" size={24} />
              <p className="body-text">Sábado, 24 de Abril 2027</p>
            </div>
            
            <div className="detail-item">
              <Clock className="icon" size={24} />
              <p className="body-text">Ceremonia a las 4:00 PM</p>
            </div>

            <div className="detail-item location-item">
              <MapPin className="icon" size={24} />
              <div className="location-text">
                <p className="body-text" style={{fontWeight: 'bold', color: 'var(--text-main)'}}>Lienzo Charro de Aragón</p>
                <p className="body-text" style={{fontSize: '0.9rem'}}>Av. 661 300, San Juan de Aragón<br/>Gustavo A. Madero, 07920 CDMX</p>
              </div>
            </div>
            
            <a href={mapLink} target="_blank" rel="noopener noreferrer" className="map-button" style={{textDecoration: 'none'}}>
              <MapPin size={18} />
              Ver Mapa
            </a>
          </div>
        </motion.div>

        {/* Contenedor Familia / Mascotas */}
        <motion.div className="pets-card" variants={itemVariants}>
          <div className="card-content" style={{paddingTop: '35px', marginTop: '0'}}>
            <h3 className="heading">Nuestra Familia</h3>
            <p className="body-text" style={{marginBottom: '20px'}}>¡Ellos también te esperan!</p>
            <div className="pets-grid">
              <img src={img2} alt="Pez y Cuyo" className="pet-img" />
              <img src={img3} alt="Ramón" className="pet-img" />
              <img src={img4} alt="Rondoll azul" className="pet-img" />
              <img src={img5} alt="Rondoll floral" className="pet-img" />
            </div>
          </div>
        </motion.div>

        <motion.div className="form-section" variants={itemVariants}>
          <ConfirmationForm guestName={guestName} maxTickets={tickets} />
        </motion.div>
        
        <div className="footer-spacer"></div>
      </div>
    </motion.div>
  );
}
