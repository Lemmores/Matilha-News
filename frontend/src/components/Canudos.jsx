import React, { useEffect } from 'react';
import './Canudos.css';

export default function RedCanudos() {
  useEffect(() => {
    document.body.classList.add('redcanudos-bg');
    return () => {
      document.body.classList.remove('redcanudos-bg');
    };
  }, []);

  const times = [
    { nome: 'Amantes da Nissinha', logo: '/amantes.jpg' },
    { nome: 'Artic', logo: '/artic.jpg' },
    { nome: 'Bigodes', logo: '/bigodes.jpg' },
    { nome: 'Cabras', logo: '/cabras.jpg' },
    { nome: 'Canabbis', logo: '/canabbis.jpg' },
    { nome: 'Canalhas', logo: '/canalhas.jpg' },
    { nome: 'Capangas', logo: '/capangas.jpg' },
    { nome: 'Cuzão', logo: '/cuzão.jpg' },
    { nome: 'Cuzinho', logo: '/cuzinho.jpg' },
    { nome: 'F4N', logo: '/f4n.jpg' },
    { nome: 'Foxtail', logo: '/foxtail.jpg' },
    { nome: 'Masters', logo: '/masters.jpg' },
    { nome: 'Minas', logo: '/minas.jpg' },
    { nome: 'RED J', logo: '/redj.jpg' },
    { nome: 'RED PE', logo: '/redpe.jpg' },
    { nome: 'Renegados', logo: '/renegados.jpg' },
  ];

  return (
    <div className="red-canudos">
      <h1>RED Canudos</h1>

      <img
        src="/bannercanudos.jpg"
        alt="Banner do RED Canudos"
        className="banner-canudos"
      />

      <p className="descricao">
        O <strong>RED Canudos</strong> é o grande campeonato de <strong>League of Legends</strong> da Matilha!  
        Tradicional e aguardado por todos os torcedores, o torneio reúne 16 equipes disputando em um novo formato
        para decidir quem será o verdadeiro campeão da Matilha.  
        As partidas contam com transmissão especial feita pelos <strong>Creators da RED</strong>, e os times já estão
        treinando pesado para brigar pelo título nesta edição histórica.
      </p>

      <h3>Times confirmados dessa edição:</h3>

      <div className="logos-times">
        {times.map((time, index) => (
          <div key={index} className="logo-card">
            <img src={time.logo} alt={time.nome} className="logo-time" />
            <p>{time.nome}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
