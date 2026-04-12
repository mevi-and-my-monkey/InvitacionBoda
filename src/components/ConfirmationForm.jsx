import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2 } from 'lucide-react';
import './ConfirmationForm.css';
import imgConfirmacion from '../assets/confirmar-asistencia-bg.png';

export default function ConfirmationForm({ guestName, maxTickets }) {
  const [selectedTickets, setSelectedTickets] = useState(maxTickets);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTickets > 0) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8ab196', '#dcb88e', '#ffffff']
      });
    }
    setSubmitted(true);
    console.log(`Invitado: ${guestName}, Boletos confirmados: ${selectedTickets}`);
  };

  if (submitted) {
    return (
      <div className="confirmation-bg-card">
        <div className="confirmation-image-wrapper">
          <img src={imgConfirmacion} alt="Fondo Confirmación" className="confirmation-bg-image" />
          <div className="confirmation-overlay-content">
            <div className="success-message" style={{padding: '0 10px'}}>
              <CheckCircle2 color="var(--primary-color)" size={36} />
              <h3 className="heading overlay-heading" style={{marginTop: '10px'}}>¡Gracias!</h3>
              <p className="body-text overlay-body-text">
                {selectedTickets > 0 ? 'Los esperamos para celebrar. ¡Estamos muy felices!' : 'Te echaremos de menos. Te llevamos en el corazón.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const ticketOptions = Array.from({length: maxTickets}, (_, i) => i + 1);

  return (
    <div className="confirmation-bg-card">
      <div className="confirmation-image-wrapper">
        <img src={imgConfirmacion} alt="Fondo Confirmación" className="confirmation-bg-image" />
        <div className="confirmation-overlay-content">
          <h3 className="heading overlay-heading" style={{marginTop: 0}}>Confirmar</h3>
          <p className="body-text overlay-body-text" style={{marginBottom: '5px'}}>Ayúdanos a contemplarte.</p>
          
          <form onSubmit={handleSubmit} className="form-layout-overlay">
            <div className="form-group-overlay">
              <label className="overlay-label">Invitado</label>
              <input type="text" value={guestName} readOnly className="readonly-input overlay-input" />
            </div>
            
            <div className="form-group-overlay">
              <label className="overlay-label">Boletos</label>
              <select 
                value={selectedTickets} 
                onChange={(e) => setSelectedTickets(Number(e.target.value))}
                className="ticket-select overlay-select"
              >
                <option value={0}>No podré asistir</option>
                {ticketOptions.map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Persona' : 'Personas'}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="submit-button small-submit-button">
              <Send size={14} />
              <span style={{fontSize: '0.8rem'}}>Enviar</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
