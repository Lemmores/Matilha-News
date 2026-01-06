import React, { useEffect } from 'react';
import './MatilhaTactics.css';

export default function MatilhaTactics() {
  useEffect(() => {
    document.body.classList.add('matilha-bg');
    return () => {
      document.body.classList.remove('matilha-bg');
    };
  }, []);

  return (
    <div className="tactics-wrapper">
      {/* SEÇÃO HERO */}
      <header className="hero-section">
        <div className="banner-container">
          <img src="/bannermatilha.jpg" alt="Banner Matilha Tactics" className="banner-tactics" />
          <div className="banner-overlay"></div>
          <div className="hero-content">
            <h1 className="glitch-title">MATILHA TACTICS</h1>
            <p className="subtitle">Estratégia, Sorte e Domínio no Tabuleiro</p>
          </div>
        </div>
      </header>

      <main className="container-content">
        {/* CAIXA DE INFORMAÇÃO EXPANDIDA */}
        <section className="info-box">
          <div className="decorator-line"></div>
          <h2 className="info-title">O MESTRE DAS ESTRATÉGIAS</h2>
          <div className="descricao-container">
            <p className="descricao-longa">
              O <strong>Matilha Tactics</strong> é o ápice da competição de <strong>Teamfight Tactics</strong> exclusiva para a comunidade da RED CANIDS. Aqui, a sorte é apenas um detalhe; o que realmente importa é a sua capacidade de adaptação, economia e posicionamento para dominar o lobby.
            </p>
            <p className="descricao-longa">
              Este torneio reúne os estrategistas mais astutos da Matilha em uma disputa emocionante por premiações exclusivas e o título de mestre do Set atual. Cada rolagem de dado e cada item combinado pode ser a diferença entre o Top 1 e a eliminação precoce.
            </p>
            <p className="descricao-longa">
              Se você acredita que tem o que é preciso para prever o meta, montar as composições mais imbatíveis e vencer batalhas intensas, este é o seu lugar. A arena está pronta, as peças estão no tabuleiro e a glória aguarda o verdadeiro mestre da estratégia.
            </p>
          </div>
        </section>

        {/* SEÇÃO DE INSCRIÇÃO */}
        <section className="registration-section">
          <div className="section-header">
            <h2 className="section-title">GARANTA SUA VAGA</h2>
            <p>Preencha o formulário abaixo para entrar na disputa</p>
          </div>
          
          <div className="formulario-container card-form">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSdKOwSIX1J3fMMt-ub4UHjWgheznlBVPeFA8TyszgXq3rnJCA/viewform?embedded=true"
              title="Formulário de Inscrição"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </section>
      </main>
    </div>
  );
}