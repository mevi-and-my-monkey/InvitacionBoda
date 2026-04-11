import React, { useState, useEffect } from 'react';
import Envelope from './components/Envelope';
import Invitation from './components/Invitation';
import './App.css'; // Just for layout

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [guestName, setGuestName] = useState('Invitado Especial');
  const [tickets, setTickets] = useState(1);

  useEffect(() => {
    // Leer params de la URL: ?invitado=Familia+Garcia&boletos=4
    const params = new URLSearchParams(window.location.search);
    const invitadoParam = params.get('invitado');
    const boletosParam = params.get('boletos');

    if (invitadoParam) {
      setGuestName(invitadoParam);
    }
    if (boletosParam) {
      setTickets(parseInt(boletosParam, 10) || 1);
    }
  }, []);

  return (
    <div className="app-container">
      {!isOpen ? (
        <Envelope onOpen={() => setIsOpen(true)} />
      ) : (
        <Invitation guestName={guestName} tickets={tickets} />
      )}
    </div>
  );
}

export default App;
