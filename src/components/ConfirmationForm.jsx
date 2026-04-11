import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2 } from 'lucide-react';
import './ConfirmationForm.css';

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
      <div className="confirmation-card">
        <div className="success-message">
          <CheckCircle2 color="var(--primary-color)" size={48} />
          <h3 className="heading" style={{marginTop: '15px'}}>¡Gracias por tu respuesta!</h3>
          <p className="body-text">
            {selectedTickets > 0 ? 'Los esperamos para celebrar juntos. ¡Nuestra familia está muy feliz!' : 'Lamentamos que no puedas acompañarnos. Te llevaremos en el corazón.'}
          </p>
        </div>
      </div>
    );
  }

  const ticketOptions = Array.from({length: maxTickets}, (_, i) => i + 1);

  return (
    <div className="confirmation-card standalone-card">
      <div className="card-content" style={{paddingTop: '35px', marginTop: '0'}}>
        <h3 className="heading">Confirmar Asistencia</h3>
        <p className="body-text" style={{marginBottom: '20px'}}>Ayúdanos a contemplarte en nuestro gran día.</p>
        
        <form onSubmit={handleSubmit} className="form-layout">
          <div className="form-group">
            <label>Invitado</label>
            <input type="text" value={guestName} readOnly className="readonly-input" />
          </div>
          
          <div className="form-group">
            <label>Boletos a confirmar</label>
            <select 
              value={selectedTickets} 
              onChange={(e) => setSelectedTickets(Number(e.target.value))}
              className="ticket-select"
            >
              <option value={0}>No podré asistir</option>
              {ticketOptions.map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'Persona' : 'Personas'}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="submit-button">
            <Send size={18} />
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
