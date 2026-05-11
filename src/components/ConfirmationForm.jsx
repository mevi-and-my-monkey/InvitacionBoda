import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2 } from 'lucide-react';
import './ConfirmationForm.css';
import imgFrame from '../assets/confirmar-asistencia-bg.png';

export default function ConfirmationForm({ guestName, maxTickets }) {
  const [attending, setAttending] = useState(null); // null | true | false
  const [count, setCount]         = useState(maxTickets);
  const [note, setNote]           = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (attending === null) return;
    if (attending) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8ab196', '#dcb88e', '#f5c6cb'],
      });
    }
    setSubmitted(true);
    console.log({ guestName, attending, count: attending ? count : 0, note });
  };

  return (
    <div className="cf-wrap">
      <p className="cf-deadline">CONFIRMA ANTES DEL 24 DE MARZO</p>

      {/* Dark header */}
      <div className="cf-header">
        <h2 className="cf-title">¿Vienes?</h2>
        <p className="cf-subtitle">Tu confirmación liga directo a nosotros.</p>
      </div>

      {/* Frame image + form overlay */}
      <div className="cf-frame-wrap">
        <img src={imgFrame} alt="" className="cf-frame-img" aria-hidden="true" />

        <div className="cf-overlay">
          {submitted ? (
            <div className="cf-success">
              <CheckCircle2 color="var(--primary-dark)" size={30} />
              <p className="cf-success-msg">
                {attending
                  ? '¡Los esperamos para celebrar!'
                  : 'Te echaremos de menos. ❤'}
              </p>
            </div>
          ) : (
            <form className="cf-form" onSubmit={handleSubmit}>

              {/* Nombre */}
              <div className="cf-field">
                <label className="cf-label">TU NOMBRE</label>
                <input
                  type="text"
                  value={guestName}
                  readOnly
                  className="cf-input cf-input-readonly"
                />
              </div>

              {/* Asistencia toggle */}
              <div className="cf-field">
                <label className="cf-label">¿NOS ACOMPAÑAS?</label>
                <div className="cf-toggle">
                  <button
                    type="button"
                    className={`cf-toggle-btn${attending === true ? ' active' : ''}`}
                    onClick={() => { setAttending(true); if (count === 0) setCount(1); }}
                  >
                    Sí, ahí estaré
                  </button>
                  <button
                    type="button"
                    className={`cf-toggle-btn${attending === false ? ' active' : ''}`}
                    onClick={() => { setAttending(false); setCount(0); }}
                  >
                    No podré ir
                  </button>
                </div>
              </div>

              {/* Counter — only when attending */}
              {attending === true && (
                <div className="cf-field">
                  <label className="cf-label">PERSONAS CONFIRMADAS</label>
                  <div className="cf-counter">
                    <button
                      type="button"
                      className="cf-counter-btn"
                      onClick={() => setCount(c => Math.max(1, c - 1))}
                    >−</button>
                    <span className="cf-counter-val">{count}</span>
                    <button
                      type="button"
                      className="cf-counter-btn"
                      onClick={() => setCount(c => Math.min(maxTickets, c + 1))}
                    >+</button>
                  </div>
                </div>
              )}

              {/* Nota */}
              <div className="cf-field">
                <label className="cf-label">NOTA (OPCIONAL)</label>
                <textarea
                  className="cf-textarea"
                  placeholder="Restricciones alimentarias..."
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  rows={2}
                />
              </div>

              <button
                type="submit"
                className="cf-submit"
                disabled={attending === null}
              >
                Confirmar
              </button>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}
