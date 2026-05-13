import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2 } from 'lucide-react';
import './ConfirmationForm.css';
import imgFrame from '../assets/confirmar-asistencia-bg.png';

const SHEETS_URL = import.meta.env.VITE_SHEETS_URL
  || 'https://script.google.com/macros/s/AKfycbxGoSedPPr-f_A6mIwtrox3zpU0FDKCGJtYKjnX5OJFARD_EqMUBIDhotHh9cIgEFY/exec';

function saveToSheets(guestName, attending, count) {
  const url = new URL(SHEETS_URL);
  url.searchParams.set('nombre', guestName);
  url.searchParams.set('asistencia', attending ? 'Sí' : 'No');
  url.searchParams.set('personas', attending ? count : 0);
  url.searchParams.set('fecha', new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' }));
  // Image request bypasses CORS restrictions for simple GET calls to Apps Script
  new Image().src = url.toString();
  console.log('[RSVP] enviando a sheets:', url.toString());
}

export default function ConfirmationForm({ guestName, maxTickets }) {
  const [attending, setAttending] = useState(null); // null | true | false
  const [count, setCount]         = useState(maxTickets);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending]     = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (attending === null || sending) return;
    setSending(true);
    saveToSheets(guestName, attending, attending ? count : 0);
    if (attending) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8ab196', '#dcb88e', '#f5c6cb'],
      });
    }
    setTimeout(() => { setSending(false); setSubmitted(true); }, 800);
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
                <label className="cf-label">INVITAD@S</label>
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

              {/* Selector — only when attending */}
              {attending === true && (
                <div className="cf-field">
                  <label className="cf-label">¿CUÁNTOS ASISTIRÁN?</label>
                  <select
                    className="cf-select"
                    value={count}
                    onChange={e => setCount(parseInt(e.target.value, 10))}
                  >
                    {Array.from({ length: maxTickets }, (_, i) => i + 1).map(n => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'persona' : 'personas'}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="cf-submit"
                disabled={attending === null || sending}
              >
                {sending ? 'Enviando…' : 'Confirmar'}
              </button>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}
