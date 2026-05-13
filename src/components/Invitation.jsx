import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Phone, Music, VolumeX } from 'lucide-react';
import ConfirmationForm from './ConfirmationForm';
import './Invitation.css';

import imgCouple from '../assets/media__1775949218809.jpg';
import imgFamily from '../assets/cuando-donde-bg.png';

// ── Countdown ──────────────────────────────────────────────
const WEDDING_DATE = new Date('2027-04-24T16:00:00');

function getTimeLeft() {
  const diff = WEDDING_DATE - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, mins: 0, segs: 0 };
  return {
    days:  Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    mins:  Math.floor((diff % 3600000) / 60000),
    segs:  Math.floor((diff % 60000) / 1000),
  };
}

function useCountdown() {
  const [t, setT] = useState(getTimeLeft);
  useEffect(() => {
    const id = setInterval(() => setT(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

// ── Calendar helpers ───────────────────────────────────────
function addToGoogle() {
  const url =
    'https://www.google.com/calendar/render?action=TEMPLATE'
    + '&text=Boda+Alejandro+%26+Diana'
    + '&dates=20270424T220000Z%2F20270425T080000Z'
    + '&details=Ceremonia+Religiosa+y+Recepci%C3%B3n'
    + '&location=Lienzo+Charro+de+Arag%C3%B3n%2C+CDMX';
  window.open(url, '_blank');
}

function downloadICS() {
  const lines = [
    'BEGIN:VCALENDAR', 'VERSION:2.0',
    'BEGIN:VEVENT',
    'DTSTART:20270424T160000',
    'DTEND:20270425T020000',
    'SUMMARY:Boda Alejandro & Diana',
    'LOCATION:Lienzo Charro de Aragón\\, Av. 661 300\\, San Juan de Aragón\\, CDMX',
    'END:VEVENT', 'END:VCALENDAR',
  ];
  const a = Object.assign(document.createElement('a'), {
    href: URL.createObjectURL(new Blob([lines.join('\r\n')], { type: 'text/calendar' })),
    download: 'boda-alejandro-diana.ics',
  });
  a.click();
}

// ── Data ───────────────────────────────────────────────────
const MISA_LINK      = 'https://maps.app.goo.gl/YYMgzXCX4R5BkpSK9';
const RECEPCION_LINK = 'https://maps.app.goo.gl/4RfwJkoV3HnNcngL6';

const ITINERARY = [
  { time: '5:00 PM',  event: 'Ceremonia religiosa',    sub: 'Parroquia Señor de la Misericordia' },
  { time: '6:00 PM',  event: 'Sesión de fotos',        sub: 'Cocktail para los invitados'        },
  { time: '6:30 PM',  event: 'Recepción',              sub: 'Lienzo Charro de Aragón'            },
  { time: '8:00 PM',  event: 'Cena',                   sub: 'Servida en sus mesas'               },
  { time: '9:30 PM',  event: 'Primer baile y brindis', sub: ''                                   },
  { time: '10:00 PM', event: '¡A bailar!',             sub: 'Pista abierta toda la noche'        },
  { time: '2:00 AM',  event: 'Tornaboda',              sub: 'Para los más fiesteros'             },
];

const PADRINOS_GRID = [
  { cat: 'Anillos',  p: ['Lucía Mendoza',   'Carlos Reyes']   },
  { cat: 'Lazos',    p: ['Patricia Castro',  'Jorge Torres']   },
  { cat: 'Arras',    p: ['Ana López',        'Miguel Soto']    },
  { cat: 'Biblia',   p: ['Elena Vargas',     'Antonio Ruiz']   },
  { cat: 'Ramo',     p: ['María Fernández',  'Pedro Aguilar']  },
  { cat: 'Pillares', p: ['Rosa Jiménez',     'Eduardo Morán'] },
];

// ── Shared components ──────────────────────────────────────
const SectionLabel = ({ children }) => (
  <p className="inv-section-label">{children}</p>
);

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const Sec = ({ children, className = '' }) => (
  <motion.section
    className={`inv-section ${className}`}
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-60px' }}
  >
    {children}
  </motion.section>
);

// ── Main component ─────────────────────────────────────────
export default function Invitation({ guestName, tickets }) {
  const time = useCountdown();
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.35;
    audio.loop = true;
    const play = audio.play();
    if (play !== undefined) {
      play.then(() => setPlaying(true)).catch(() => {});
    }
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else { audio.play(); setPlaying(true); }
  };

  return (
    <motion.div
      className="inv"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* ── AUDIO ─────────────────────────────── */}
      <audio ref={audioRef} src="/music/marte.mp3" preload="auto" />

      {/* ── MUSIC TOGGLE ──────────────────────── */}
      <button className="inv-music-btn" onClick={toggleMusic} aria-label="Música">
        {playing ? <Music size={16} /> : <VolumeX size={16} />}
      </button>

      {/* ── FLOATING PETALS ───────────────────── */}
      {[...Array(10)].map((_, i) => (
        <span key={i} className={`inv-petal inv-petal-${i}`} aria-hidden="true" />
      ))}

      {/* ── HERO ──────────────────────────────── */}
      <motion.section
        className="inv-section inv-hero"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <div className="inv-hero-top">
          <p className="inv-label-top">NOS CASAMOS</p>
          <h1 className="inv-script">Diana</h1>
          <div className="inv-amp-row">
            <span className="inv-amp-line" />
            <span className="inv-amp-sm">&amp;</span>
            <span className="inv-amp-line" />
          </div>
          <h1 className="inv-script">Alejandro</h1>
        </div>

        <div className="inv-hero-img-wrap">
          <img src={imgCouple} alt="Diana y Alejandro" className="inv-hero-img" />
        </div>

        <div className="inv-hero-bottom">
          <div className="inv-date-block">
            <div className="inv-date-col">
              <span className="inv-tickets">SÁBADO</span>
              <span className="inv-date-sm inv-date-abril">Abril</span>
            </div>
            <div className="inv-date-divider" />
            <span className="inv-date-big">24</span>
            <div className="inv-date-divider" />
            <div className="inv-date-col">
              <span className="inv-tickets">5:00 PM</span>
              <span className="inv-date-sm">2027</span>
            </div>
          </div>

          <p className="inv-te-invitamos">— TE INVITAMOS A TI —</p>
          <h2 className="inv-guest-name">{guestName}</h2>
          <p className="inv-tickets">
            {tickets} {tickets === 1 ? 'pase reservado' : 'pases reservados'} con cariño
          </p>
          <span className="inv-open-quote">&ldquo;</span>
          <p className="inv-quote">
            El amor no consiste en mirarse el uno al otro,<br />
            sino en mirar juntos en la misma dirección.
          </p>
        </div>
      </motion.section>

      {/* ── COUNTDOWN ─────────────────────────── */}
      <Sec className="inv-countdown">
        <SectionLabel>— FALTAN —</SectionLabel>
        <div className="inv-cd-grid">
          {[
            { v: time.days,  l: 'días'  },
            { v: time.hours, l: 'horas' },
            { v: time.mins,  l: 'mins'  },
            { v: time.segs,  l: 'seg'   },
          ].map(({ v, l }) => (
            <div key={l} className="inv-cd-item">
              <span className="inv-cd-num">{v}</span>
              <span className="inv-cd-label">{l}</span>
            </div>
          ))}
        </div>
        <div className="inv-cal-btns">
          <button className="inv-cal-btn" onClick={addToGoogle}>
            Google Calendar
          </button>
          <button className="inv-cal-btn inv-cal-btn-outline" onClick={downloadICS}>
            Apple / .ICS
          </button>
        </div>
      </Sec>

      {/* ── VENUES ────────────────────────────── */}
      <Sec>
        <SectionLabel>— DÓNDE TE ESPERAMOS —</SectionLabel>
        <h2 className="inv-section-title">Misa &amp; Recepción</h2>

        <div className="inv-venue-card">
          <div className="inv-venue-header">
            <span className="inv-venue-icon">⛪</span>
            <p className="inv-venue-type">MISA</p>
          </div>
          <p className="inv-venue-name">Parroquia Señor de la Misericordia</p>
          <p className="inv-venue-addr">
            Av. Insurgentes Nte, Lindavista<br />
            Gustavo A. Madero, 07300 CDMX
          </p>
          <p className="inv-venue-time">5:00 PM</p>
          <div className="inv-venue-map-wrap">
            <iframe
              src="https://maps.google.com/maps?q=Parroquia+Se%C3%B1or+de+la+Misericordia+Lindavista+CDMX&output=embed&hl=es"
              className="inv-venue-map"
              loading="lazy"
              title="Mapa Parroquia"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="inv-venue-card">
          <div className="inv-venue-header">
            <span className="inv-venue-icon">🥂</span>
            <p className="inv-venue-type">RECEPCIÓN</p>
          </div>
          <p className="inv-venue-name">Lienzo Charro de Aragón</p>
          <p className="inv-venue-addr">
            Av. 661 300, San Juan de Aragón<br />
            Gustavo A. Madero, 07920 CDMX
          </p>
          <p className="inv-venue-time">6:30 PM</p>
          <div className="inv-venue-map-wrap">
            <iframe
              src="https://maps.google.com/maps?q=Lienzo+Charro+de+Arag%C3%B3n+San+Juan+de+Arag%C3%B3n+CDMX&output=embed&hl=es"
              className="inv-venue-map"
              loading="lazy"
              title="Mapa Recepción"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Sec>

      {/* ── FAMILY / PETS ─────────────────────── */}
      <Sec className="inv-family-sec">
        <div className="inv-family-wrap">
          <img src={imgFamily} alt="Ramón & cia." className="inv-family-img" />
          <div className="inv-family-overlay">
            <p className="inv-family-label">NUESTRA FAMILIA</p>
            <p className="inv-family-quote">Ramón &amp; cia.</p>
            <p className="inv-family-tagline">Donde hay amor, hay familia.</p>
          </div>
        </div>
      </Sec>

      {/* ── ITINERARY ─────────────────────────── */}
      <Sec>
        <SectionLabel>— PROGRAMA —</SectionLabel>
        <h2 className="inv-section-title">Itinerario del día</h2>
        <ul className="inv-timeline">
          {ITINERARY.map(({ time: t, event, sub }) => (
            <li key={t} className="inv-tl-item">
              <span className="inv-tl-time">{t}</span>
              <span className="inv-tl-dot" />
              <div className="inv-tl-text">
                <p className="inv-tl-event">{event}</p>
                {sub && <p className="inv-tl-sub">{sub}</p>}
              </div>
            </li>
          ))}
        </ul>
      </Sec>

      {/* ── DRESS CODE ────────────────────────── */}
      <Sec className="inv-dresscode">
        <SectionLabel>— CÓMO VESTIRNOS —</SectionLabel>
        <h2 className="inv-section-title">Código formal</h2>
        <p className="inv-body-text">
          Caballeros: traje oscuro.<br />Damas: vestido largo o de cocktail.
        </p>
        <div className="inv-swatch-wrap">
          <div className="inv-swatch-circle">
            <span className="inv-swatch-slash">/</span>
          </div>
          <span className="inv-swatch-label">Blanco</span>
        </div>
        <p className="inv-body-text inv-italic-note">
          Te pedimos reservar el blanco para la novia —<br />
          ¡cualquier otro color es bienvenido!
        </p>
      </Sec>

      {/* ── PADRINOS ──────────────────────────── */}
      <Sec>
        <SectionLabel>— CON LA BENDICIÓN DE —</SectionLabel>
        <h2 className="inv-section-title">Nuestros padrinos</h2>

        <div className="inv-honor-card">
          <p className="inv-honor-label">PADRINOS DE HONOR</p>
          <p className="inv-honor-cat">Velación</p>
          <p className="inv-honor-name">Margarita Hernández</p>
          <p className="inv-honor-name">Roberto Ortiz</p>
        </div>

        <div className="inv-pad-grid">
          {PADRINOS_GRID.map(({ cat, p }) => (
            <div key={cat} className="inv-pad-item">
              <p className="inv-pad-cat">{cat}</p>
              {p.map(n => <p key={n} className="inv-pad-name">{n}</p>)}
            </div>
          ))}
        </div>
      </Sec>

      {/* ── MESA DE REGALOS ───────────────────── */}
      <Sec>
        <SectionLabel>— SI GUSTAS REGALARNOS —</SectionLabel>
        <h2 className="inv-section-title">Mesa de regalos</h2>
        <p className="inv-body-text">
          Tu presencia ya es regalo más que suficiente.<br />Si deseas algo más:
        </p>
        <div className="inv-gifts">
          <a
            href="https://www.liverpool.com.mx"
            target="_blank"
            rel="noopener noreferrer"
            className="inv-gift-row"
          >
            <span className="inv-gift-icon">🎁</span>
            <div className="inv-gift-info">
              <span className="inv-gift-store">Liverpool</span>
              <span className="inv-gift-detail">Mesa N° S1234</span>
            </div>
            <span className="inv-gift-arrow">→</span>
          </a>
          <a
            href="https://www.amazon.com.mx"
            target="_blank"
            rel="noopener noreferrer"
            className="inv-gift-row"
          >
            <span className="inv-gift-icon">🎁</span>
            <div className="inv-gift-info">
              <span className="inv-gift-store">Amazon</span>
              <span className="inv-gift-detail">Lista A&amp;D 2027</span>
            </div>
            <span className="inv-gift-arrow">→</span>
          </a>
        </div>
      </Sec>

      {/* ── NIÑOS ─────────────────────────────── */}
      <Sec className="inv-kids">
        <div className="inv-kids-inner">
          <span className="inv-kids-emoji">👶</span>
          <div className="inv-kids-text">
            <h3 className="inv-kids-title">Niños bienvenidos</h3>
            <p className="inv-body-text">
              Las familias son nuestra alegría. Tendremos un rinconcito para los pequeños.
            </p>
          </div>
        </div>
      </Sec>

      {/* ── RSVP ──────────────────────────────── */}
      <Sec className="inv-rsvp-sec">
        <ConfirmationForm guestName={guestName} maxTickets={tickets} />
      </Sec>

      {/* ── CONTACTO ──────────────────────────── */}
      <Sec>
        <SectionLabel>— CUALQUIER DUDA —</SectionLabel>
        <h2 className="inv-section-title">Contacto</h2>
        <div className="inv-contacts">
          <a href="tel:+5215512345678" className="inv-contact-row">
            <div className="inv-contact-icon"><Phone size={16} /></div>
            <div className="inv-contact-info">
              <span className="inv-contact-name">Sofía</span>
              <span className="inv-contact-role">Hermana de Diana — Confirmaciones</span>
            </div>
            <span className="inv-contact-phone">+52 55 1234 5678</span>
          </a>
          <a href="tel:+5215538765432" className="inv-contact-row">
            <div className="inv-contact-icon"><Phone size={16} /></div>
            <div className="inv-contact-info">
              <span className="inv-contact-name">Ricardo</span>
              <span className="inv-contact-role">Hermano de Alejandro — Logística</span>
            </div>
            <span className="inv-contact-phone">+52 55 3876 5432</span>
          </a>
        </div>
      </Sec>

      {/* ── FOOTER ────────────────────────────── */}
      <footer className="inv-footer">
        <p className="inv-footer-mono">D&amp;A</p>
        <p className="inv-footer-tag">#DianaYAlejandroSeCasan</p>
      </footer>

    </motion.div>
  );
}
