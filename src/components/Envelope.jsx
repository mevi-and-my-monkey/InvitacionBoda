import React from 'react';
import { motion } from 'framer-motion';
import { MailOpen } from 'lucide-react';
import './Envelope.css';

export default function Envelope({ onOpen }) {
  return (
    <motion.div 
      className="envelope-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)', transition: { duration: 0.6 } }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Elementos decorativos florales minimalistas */}
      <div className="decoration top-left"></div>
      <div className="decoration bottom-right"></div>

      <div className="envelope-content">
        <h2 className="heading" style={{ color: 'var(--text-light)', fontSize: '1rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
          Nuestra Boda
        </h2>
        
        <h1 className="title" style={{ margin: '20px 0 10px 0' }}>
          Alejandro &amp; Diana
        </h1>

        <p className="body-text" style={{ fontStyle: 'italic', marginBottom: '40px' }}>
          Tenemos un sobre para ti...
        </p>
        
        <motion.button 
          className="open-button"
          onClick={onOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MailOpen size={20} />
          Abrir Invitación
        </motion.button>
      </div>
    </motion.div>
  );
}
