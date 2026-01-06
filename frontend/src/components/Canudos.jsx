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
          </div>
        </div>
      </header>

      <main className="container-content">
        <section className="info-box">
          <div className="decorator-line"></div>
          <p className="descricao-longa">
      O <strong>RED Canudos</strong> se consolidou não apenas como um campeonato, mas como uma verdadeira celebração da comunidade da Matilha.
    Consagrado como o torneio de <strong>League of Legends mais tradicional da nossa torcida</strong>, o evento representou um campo de prova
    onde lendas foram forjadas e rivalidades ganharam vida dentro do Summoner’s Rift.
  </p>

  <p>
    Nesta edição histórica, o nível da competição foi elevado com um <strong>formato renovado e intenso</strong>, reunindo
    <strong>16 equipes</strong> que disputaram cada objetivo e cada Nexus em busca do título de
    <strong>verdadeiro Campeão da Matilha</strong>. As partidas foram marcadas por jogos emocionantes,
    alto nível competitivo e confrontos que ficaram na memória da torcida.
  </p>

  <p>
    A experiência foi completa do início ao fim. Cada jogada decisiva contou com a análise e a emoção das
    <strong>transmissões especiais realizadas pelos Creators da RED</strong>, aproximando ainda mais a comunidade do campeonato.
    Além disso, a edição contou com <strong>premiação especial para o time campeão e para o MVP da grande final</strong>,
    valorizando o desempenho individual e coletivo.
  </p>

  <p>
    Os times desta edição já foram formados e o campeão foi definido, mas a história do RED Canudos está longe de acabar.
    <strong>Novas edições acontecerão</strong>, prometendo manter viva a essência competitiva e a paixão da Matilha.
    Fiquem ligados para os próximos capítulos.
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