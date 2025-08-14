import './WatchParties.css';
import { useState, useEffect } from 'react';
import WatchPartyCard from './WatchPartyCard';
import axios from 'axios';

export default function WatchParties() {
  const [filtro, setFiltro] = useState('TUDO');
  const [eventos, setEventos] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    axios.get(`${API_URL}/api/watchparties`)
      .then(res => {
        console.log('Resposta da API:', res.data);
        setEventos(res.data);
      })
      .catch(err => console.error(err));
  }, [API_URL]);

  const hoje = new Date();

  // Função para converter data DD/MM/AAAA em objeto Date
  const converterData = (dataStr) => {
    const [dia, mes, ano] = dataStr.split('/');
    return new Date(`${ano}-${mes}-${dia}`);
  };

  // Proteção para garantir que eventos é array antes do filter
  let eventosFiltrados = Array.isArray(eventos)
    ? eventos.filter((evento) => {
        const dataEvento = converterData(evento.data);
        if (filtro === 'TUDO') return true;
        if (filtro === 'NOVAS') return dataEvento >= hoje;
        if (filtro === 'EXPIRADAS') return dataEvento < hoje;
        return true;
      })
    : [];

  // Ordenações específicas
  if (filtro === 'TUDO') {
    // Mais recente → mais antigo
    eventosFiltrados.sort((a, b) => converterData(b.data) - converterData(a.data));
  } else if (filtro === 'NOVAS') {
    // Mais próximo → mais distante no futuro
    eventosFiltrados.sort((a, b) => converterData(a.data) - converterData(b.data));
  } else if (filtro === 'EXPIRADAS') {
    // Mais recente expirado → mais antigo
    eventosFiltrados.sort((a, b) => converterData(b.data) - converterData(a.data));
  }

  // Ordem dos filtros
  const filtros = ['NOVAS', 'EXPIRADAS', 'TUDO'];

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
        <a
          className="grupo-link"
          href="https://chat.whatsapp.com/GRUPOGERAL"
          target="_blank"
          rel="noreferrer"
        >
          👉 Grupo Geral da Matilha
        </a>
      </div>
    </div>
  );
}
