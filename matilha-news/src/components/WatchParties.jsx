import './WatchParties.css';
import { useState } from 'react';
import WatchPartyCard from './WatchPartyCard';

export default function WatchParties() {
  const [filtro, setFiltro] = useState('TUDO');

  const eventos = [
    {
      id: 1,
      titulo: 'Watch Party - RED X LEV',
      data: '18/05/2025',
      local: 'Recife - PE',
      imagem: '/wp1.jpg',
      grupo: 'https://chat.whatsapp.com/EXEMPLO1',
      linkDetalhes: "https://www.instagram.com/p/DJpApsKttcZ/",
    },
    {
      id: 2,
      titulo: 'Watch Party - RED X LEV',
      data: '18/06/2025',
      local: 'Rio de Janeiro - RJ',
      imagem: '/wp2.jpg',
      grupo: 'https://chat.whatsapp.com/EXEMPLO2',
      linkDetalhes: "https://www.instagram.com/p/DJwwQ5zOesp/",
    },
    {
      id: 3,
      titulo: 'Watch Party - RED X LEV',
      data: '18/05/2025',
      local: 'Maceió - AL',
      imagem: '/wp3.jpg',
      grupo: 'https://chat.whatsapp.com/EXEMPLO3',
      linkDetalhes: "https://www.instagram.com/p/DJuKvhbNGzK/",
    },
  ];

  const hoje = new Date();

  const eventosFiltrados = eventos.filter((evento) => {
    const partesData = evento.data.split('/');
    const dataEvento = new Date(`${partesData[2]}-${partesData[1]}-${partesData[0]}`);

    if (filtro === 'TUDO') return true;
    if (filtro === 'NOVAS') return dataEvento >= hoje;
    if (filtro === 'EXPIRADAS') return dataEvento < hoje;
    return true;
  });

  const filtros = ['TUDO', 'NOVAS', 'EXPIRADAS'];

  return (
    <div className="watch-parties">
      <h1>Watch Parties da Matilha</h1>
      <p>
        As <strong>Watch Parties</strong> são encontros presenciais inesquecíveis organizados pela
        torcida da RED Canids Kalunga, reunindo fãs apaixonados para assistir aos jogos presencialmente,
        com muita energia e emoção! Esses eventos acontecem em diversas cidades do Brasil, fortalecendo a
        união da Matilha em cada canto do país. Seja aonde for, a festa é sempre linda — e você é parte essencial dela. 
        Vem torcer com a gente e sentir o poder da Matilha ao vivo!
      </p>

      {/* Filtros */}
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

      {/* Cards */}
      <div className="cards-container">
        {eventosFiltrados.map((evento) => (
          <WatchPartyCard key={evento.id} evento={evento} />
        ))}
      </div>

      {/* Grupo Geral */}
      <div className="grupo-info">
        <p>Entre nos grupos de WhatsApp da sua região para ficar por dentro das próximas Watch Parties!</p>
        <a className="grupo-link" href="https://chat.whatsapp.com/GRUPOGERAL" target="_blank" rel="noreferrer">
          👉 Grupo Geral da Matilha
        </a>
      </div>
    </div>
  );
}
