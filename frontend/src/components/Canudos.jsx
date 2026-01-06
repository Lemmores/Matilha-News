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
    { nome: 'Artic Foxes', logo: '/artic.jpg' },
    { nome: 'Bigodes', logo: '/bigodes.jpg' },
    { nome: 'RED Cabras', logo: '/cabras.jpg' },
    { nome: 'RED Canabbis', logo: '/canabbis.jpg' },
    { nome: 'RED Canalhas', logo: '/canalhas.jpg' },
    { nome: 'Capangas do Marechal', logo: '/capangas.jpg' },
    { nome: 'Cuzão', logo: '/cuzão.jpg' },
    { nome: 'Cuzinho', logo: '/cuzinho.jpg' },
    { nome: 'Fefex e 4 namoradas', logo: '/f4n.jpg' },
    { nome: 'Foxtail', logo: '/foxtail.jpg' },
    { nome: 'RED Masters', logo: '/masters.jpg' },
    { nome: 'RED Minas', logo: '/minas.jpg' },
    { nome: 'REDJ', logo: '/redj.jpg' },
    { nome: 'RED PE', logo: '/redpe.jpg' },
    { nome: 'Renegados', logo: '/renegados.jpg' },
  ];

  return (
    <div className="red-canudos-wrapper">
      {/* SEÇÃO HERO */}
      <header className="hero-section">
        <div className="banner-container">
          <img src="/bannercanudos.jpg" alt="Banner RED Canudos" className="banner-canudos" />
          <div className="banner-overlay"></div>
          <div className="hero-content">
            <h1 className="glitch-title">RED CANUDOS</h1>
            <p className="subtitle">O Legado da Matilha no Rift</p>
          </div>
        </div>
      </header>

      <main className="container-content">
        <section className="info-box">
          <div className="decorator-line"></div>
          <p className="descricao">
            O <strong>RED Canudos</strong> é o grande campeonato de <strong>League of Legends</strong> da Matilha! 
            Tradicional e aguardado, o torneio reúne 16 equipes em uma batalha épica com transmissões exclusivas 
            dos <strong>Creators da RED</strong>. Prepare-se para a edição histórica.
          </p>
        </section>

        {/* SEÇÃO DOS TIMES */}
        <section className="teams-section">
          <h2 className="section-title">EQUIPES CONFIRMADAS</h2>
          <div className="teams-grid">
            {times.map((time, index) => (
              <div key={index} className="team-card">
                <div className="card-inner">
                  <div className="logo-wrapper">
                    <img src={time.logo} alt={time.nome} className="team-logo" />
                  </div>
                  <div className="team-info">
                    <span className="team-rank">#0{index + 1}</span>
                    <p className="team-name">{time.nome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}