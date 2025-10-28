import React, { useEffect } from 'react';
import './Canudos.css';

export default function RedCanudos() {
  useEffect(() => {
    document.body.classList.add('redcanudos-bg');

    return () => {
      document.body.classList.remove('redcanudos-bg');
    };
  }, []);

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

    <img
    src='/Logos Canudos/amantes'
    />

    
      
    </div>
  );
}
