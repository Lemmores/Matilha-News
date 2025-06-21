import './WatchParties.css';
import { useState, useEffect } from 'react';
import WatchPartyCard from './WatchPartyCard';
import axios from 'axios';

export default function WatchParties() {
  const [filtro, setFiltro] = useState('TUDO');
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/watchparties')

      .then(res => {
        console.log('Resposta da API:', res.data);
        // Se precisar ajustar o caminho do array, altere aqui
        setEventos(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const hoje = new Date();

  // Proteção para garantir que eventos é array antes do filter
  const eventosFiltrados = Array.isArray(eventos)
    ? eventos.filter((evento) => {
        const partesData = evento.data.split('/');
        const dataEvento = new Date(`${partesData[2]}-${partesData[1]}-${partesData[0]}`);
        if (filtro === 'TUDO') return true;
        if (filtro === 'NOVAS') return dataEvento >= hoje;
        if (filtro === 'EXPIRADAS') return dataEvento < hoje;
        return true;
      })
    : [];

  const filtros = ['TUDO', 'NOVAS', 'EXPIRADAS'];

  return (
    <div className="watch-parties">
      <h1>Watch Parties da Matilha</h1>

      <div className="filtros">
        {filtros.map(f => (
          <button
            key={f}
            className={filtro === f ? 'ativo' : ''}
            onClick={() => setFiltro(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="cards-container">
        {eventosFiltrados.map((evento) => (
          <WatchPartyCard key={evento._id} evento={evento} />
        ))}
      </div>

      <div className="grupo-info">
        <p>Entre nos grupos de WhatsApp da sua região para ficar por dentro das próximas Watch Parties!</p>
        <a className="grupo-link" href="https://chat.whatsapp.com/GRUPOGERAL" target="_blank" rel="noreferrer">
          👉 Grupo Geral da Matilha
        </a>
      </div>
    </div>
  );
}
