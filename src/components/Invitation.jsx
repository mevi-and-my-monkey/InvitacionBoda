import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock } from 'lucide-react';
import ConfirmationForm from './ConfirmationForm';
import './Invitation.css';

import img1 from '../assets/media__1775949218809.jpg'; // Pareja
import imgCuandoDonde from '../assets/cuando-donde-bg.png'; // Fondo cuando y donde

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

        {/* Detalles del evento (Con ilustración de recuadro) */}
        <motion.div className="details-bg-card" variants={itemVariants}>
          <div className="location-image-wrapper">
             <img src={imgCuandoDonde} alt="Fondo Cuando y Donde" className="location-bg-image" />
             <div className="location-overlay-content">
               <h4 className="heading location-heading">Cuándo &amp; Dónde</h4>
               
               <div className="detail-item location-detail-item">
                 <Calendar className="icon" size={14} />
                 <p className="body-text location-body-text">Sábado, 24 de Abril 2027</p>
               </div>
               
               <div className="detail-item location-detail-item">
                 <Clock className="icon" size={14} />
                 <p className="body-text location-body-text">Ceremonia a las 4:00 PM</p>
               </div>

               <div className="detail-item location-item-centered">
                 <MapPin className="icon" size={14} />
                 <div className="location-text">
                   <p className="body-text location-body-text" style={{fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '2px'}}>Lienzo Charro de Aragón</p>
                   <p className="body-text location-body-text" style={{fontSize: '0.65rem', lineHeight: '1.2'}}>Av. 661 300, San Juan de Aragón<br/>Gustavo A. Madero, 07920 CDMX</p>
                 </div>
               </div>
               
               <a href={mapLink} target="_blank" rel="noopener noreferrer" className="map-button small-map-button" style={{textDecoration: 'none'}}>
                 <MapPin size={12} />
                 Ver Mapa
               </a>
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
