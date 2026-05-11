import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Envelope from './components/Envelope';
import Invitation from './components/Invitation';
import './App.css';

function App() {
  const [isOpen, setIsOpen]     = useState(false);
  const [guestName, setGuestName] = useState('Invitado Especial');
  const [tickets, setTickets]   = useState(1);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const invitado = params.get('invitado');
    const boletos  = params.get('boletos');
    if (invitado) setGuestName(invitado);
    if (boletos)  setTickets(parseInt(boletos, 10) || 1);
  }, []);

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <Envelope key="envelope" onOpen={() => setIsOpen(true)} />
        ) : (
          <Invitation key="invitation" guestName={guestName} tickets={tickets} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
