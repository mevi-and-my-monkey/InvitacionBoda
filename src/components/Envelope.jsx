import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Envelope.css';

export default function Envelope({ onOpen }) {
  const [phase, setPhase] = useState('idle'); // 'idle' | 'opening'

  const handleOpen = () => {
    if (phase !== 'idle') return;
    setPhase('opening');
    setTimeout(onOpen, 900);
  };

  return (
    <motion.div
      className="env-screen"
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.5 } }}
    >
      {/* Floating petals */}
      {[...Array(10)].map((_, i) => (
        <span key={i} className={`petal petal-${i}`} aria-hidden="true" />
      ))}

      <motion.div
        className="env-wrap"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <p className="env-supra">NOS CASAMOS</p>

        <div className="env-names">
          <span className="env-name-script">Diana</span>
          <span className="env-amp">&amp;</span>
          <span className="env-name-script">Alejandro</span>
        </div>

        <p className="env-date-label">Sábado · 24 de Abril · 2027</p>

        {/* Envelope shape */}
        <div
          className="env-envelope"
          onClick={handleOpen}
          role="button"
          tabIndex={0}
          aria-label="Abrir invitación"
          onKeyDown={e => e.key === 'Enter' && handleOpen()}
        >
          {/* Envelope body */}
          <div className="env-body">
            {/* Front folds wrapped to hide overflowing corners without clipping the letter */}
            <div className="env-front-folds">
              {/* Bottom V crease */}
              <div className="env-crease-bottom" />
              {/* Side fold shadows */}
              <div className="env-fold-left" />
              <div className="env-fold-right" />
            </div>
            {/* Mask to clip letter at the bottom but allow it to rise at the top */}
            <div className="env-letter-mask">
              <motion.div
                className="env-letter"
                animate={phase === 'opening' ? { y: -90, opacity: 1 } : { y: 80, opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.6, ease: 'easeOut' }}
              >
                <span className="env-monogram">A &amp; D</span>
              </motion.div>
            </div>
          </div>

          {/* Flap — triangle pointing down, rotates open */}
          <motion.div
            className="env-flap"
            animate={phase === 'opening' ? { rotateX: -180, zIndex: 1 } : { rotateX: 0, zIndex: 10 }}
            transition={{
              duration: 0.72,
              ease: [0.4, 0, 0.2, 1],
              zIndex: { delay: phase === 'opening' ? 0.36 : 0 }
            }}
            style={{ transformOrigin: 'top center', transformPerspective: 1400 }}
          />
        </div>

        <motion.button
          className="env-btn"
          onClick={handleOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ opacity: phase === 'opening' ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          disabled={phase !== 'idle'}
        >
          ✉ Abrir Invitación
        </motion.button>

        <p className="env-hint">Tenemos algo especial para ti...</p>
      </motion.div>
    </motion.div>
  );
}
