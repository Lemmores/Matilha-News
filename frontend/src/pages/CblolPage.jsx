import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Agenda from '../components/Agenda';
import './CblolPage.css';

const jogadores = [
  { nome: 'FNB', img: '/jogadores/fnb.jpg', twitter: 'https://twitter.com/fNbLOL', instagram: 'https://instagram.com/fNbLOL' },
  { nome: 'CURSE', img: '/jogadores/Doom.jpg', twitter: 'https://x.com/DoomLol11', instagram: 'https://www.instagram.com/curse_lol1/' },
  { nome: 'KAZE', img: '/jogadores/Kaze.jpg', twitter: 'https://x.com/1Kazelol', instagram: 'https://www.instagram.com/kaze.g_/' },
  { nome: 'RABELO', img: '/jogadores/Rabelo.jpg', twitter: 'https://x.com/rabeloxv', instagram: 'https://www.instagram.com/rabelokoo/' },
  { nome: 'FROSTY', img: '/jogadores/Frosty.jpg', twitter: 'https://x.com/frostylolx', instagram: 'https://www.instagram.com/lolfrosty1/' },
];

const CblolPage = () => {
  const [imagemAberta, setImagemAberta] = useState(null);
  const [noticiasLtaSul, setNoticiasLtaSul] = useState([]);
  const [agendaLtaSul, setAgendaLtaSul] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, agendaRes] = await Promise.all([
          fetch(`${API_URL}/api/noticias`),
          fetch(`${API_URL}/api/agenda`)
        ]);
        const newsData = await newsRes.json();
        const agendaData = await agendaRes.json();

        setNoticiasLtaSul(newsData.filter(n => n.categoria === 'CBLOL'));
        setAgendaLtaSul(agendaData.filter(a => a.campeonato === 'CBLOL'));
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };
    fetchData();
  }, [API_URL]);

  return (
    <div className="pagina-cblol">
      <header className="header-cblol">
        <h1>RED Canids no CBLOL</h1>
        <p className="subtitle">LEAGUE OF LEGENDS</p>
      </header>

      <section className="lineup-section">
        <h2 className="section-title">Line-up Oficial</h2>
        <div className="jogadores-container-horizontal">
          {jogadores.map((jogador, idx) => (
            <div key={idx} className="mini-player-card">
              <div className="mini-image-container">
                <img src={jogador.img} alt={jogador.nome} onClick={() => setImagemAberta(jogador.img)} />
                <div className="social-overlay-hover">
                  {jogador.twitter && <a href={jogador.twitter} target="_blank" rel="noopener noreferrer"><img src="/icons/x.png" alt="X" /></a>}
                  {jogador.instagram && <a href={jogador.instagram} target="_blank" rel="noopener noreferrer"><img src="/icons/instagram.png" alt="Instagram" /></a>}
                </div>
              </div>
              <div className="mini-player-footer">
                <span className="mini-player-name">{jogador.nome}</span>
                <span className="mini-player-role">PRO PLAYER</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {imagemAberta && (
        <div className="modal-overlay" onClick={() => setImagemAberta(null)}>
          <div className="modal-content">
            <img src={imagemAberta} alt="Zoom" />
          </div>
        </div>
      )}
      
      {/* Restante das seções (Vídeos/Agenda) */}
    </div>
  );
};

export default CblolPage;