import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Agenda from '../components/Agenda';
import './CblolPage.css';

const jogadores = [
  { nome: 'ZYNTS', img: '/jogadores/ZYNTS.png', twitter: 'https://x.com/zyntslol', instagram: 'https://www.instagram.com/matheuszynts1/' },
  { nome: 'STEPZ', img: '/jogadores/STEPZ.png', twitter: 'https://x.com/StepZ7_', instagram: 'https://www.instagram.com/notstepz/' },
  { nome: 'KAZE', img: '/jogadores/KAZE.png', twitter: 'https://x.com/1Kazelol', instagram: 'https://www.instagram.com/kaze.g_/' },
  { nome: 'RABELO', img: '/jogadores/RABELO.png', twitter: 'https://x.com/rabeloxv', instagram: 'https://www.instagram.com/rabelokoo/' },
  { nome: 'FROSTY', img: '/jogadores/FROSTY.png', twitter: 'https://x.com/frostylolx', instagram: 'https://www.instagram.com/lolfrosty1/' },
];

const CblolPage = () => {
  const [imagemAberta, setImagemAberta] = useState(null);
  const [noticiasLtaSul, setNoticiasLtaSul] = useState([]);
  const [agendaLtaSul, setAgendaLtaSul] = useState([]);

  const noticiasPorPagina = 3;
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

        // 🔥 Notícias CBLOL — mais recentes primeiro
        setNoticiasLtaSul(
          newsData
            .filter(n => n.categoria === 'CBLOL')
            .sort((a, b) => new Date(b.data) - new Date(a.data))
        );

        // 🔥 Agenda CBLOL — ordenada pela DATA DO CONFRONTO
        setAgendaLtaSul(
          agendaData
            .filter(a => a.campeonato === 'CBLOL')
            .sort((a, b) => new Date(b.data) - new Date(a.data))
        );

      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    fetchData();
  }, [API_URL]);

  const formatEmbedLink = (url) => {
    if (!url) return '';
    const id =
      url.includes('/live/')
        ? url.split('/live/')[1].split(/[?&]/)[0]
        : url.includes('watch?v=')
        ? new URL(url).searchParams.get('v')
        : url.includes('youtu.be/')
        ? url.split('youtu.be/')[1].split(/[?&]/)[0]
        : null;

    return id ? `https://www.youtube.com/embed/${id}` : '';
  };

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
                <img
                  src={jogador.img}
                  alt={jogador.nome}
                  onClick={() => setImagemAberta(jogador.img)}
                />

                <div className="social-overlay-hover">
                  {jogador.twitter && (
                    <a href={jogador.twitter} target="_blank" rel="noopener noreferrer">
                      <img src="/icons/x.png" alt="X" />
                    </a>
                  )}
                  {jogador.instagram && (
                    <a href={jogador.instagram} target="_blank" rel="noopener noreferrer">
                      <img src="/icons/instagram.png" alt="Instagram" />
                    </a>
                  )}
                </div>
              </div>

              <div className="mini-player-footer">
                <span className="mini-player-name">{jogador.nome}</span>
                <span className="mini-player-role">PRO PLAYER</span>

                <div className="social-mobile-only">
                  {jogador.twitter && (
                    <a href={jogador.twitter} target="_blank" rel="noopener noreferrer">
                      <img src="/icons/x.png" alt="X" />
                    </a>
                  )}
                  {jogador.instagram && (
                    <a href={jogador.instagram} target="_blank" rel="noopener noreferrer">
                      <img src="/icons/instagram.png" alt="Instagram" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {imagemAberta && (
        <div className="modal-overlay" onClick={() => setImagemAberta(null)}>
          <div className="modal-content">
            <img src={imagemAberta} alt="Zoom" />
            <button className="close-modal" onClick={() => setImagemAberta(null)}>X</button>
          </div>
        </div>
      )}

      <section className="videos-section">
        <h2 className="section-title">Últimos Confrontos</h2>
        <div className="video-column">
          {agendaLtaSul
            .filter(p => p.linkTransmissao)
            .slice(0, 2)
            .map((p, idx) => (
              <div key={idx} className="video-container-box">
                <iframe
                  src={formatEmbedLink(p.linkTransmissao)}
                  title={`Match ${idx}`}
                  allowFullScreen
                />
              </div>
            ))}
        </div>
      </section>

      <section className="news-section">
        <h2 className="section-title">Notícias Relacionadas</h2>
        <div className="noticia-list">
          {noticiasLtaSul.slice(0, 4).map(noticia => (
            <Link
              key={noticia._id}
              to={`/noticia/${noticia._id}`}
              className="card-noticia"
            >
              <img src={noticia.imagem} alt={noticia.titulo} />
              <p className="categoria">{noticia.categoria}</p>
              <h3>{noticia.titulo}</h3>
              <p className="conteudo">{noticia.conteudo}</p>
            </Link>
          ))}
        </div>

        {totalPaginas > 1 && (
          <div className="paginacao-noticias">
            <button onClick={irParaAnterior} disabled={paginaAtual === 1}>
              Anterior
            </button>

            <span className="page-indicator">
              {paginaAtual} / {totalPaginas}
            </span>

            <button onClick={irParaProxima} disabled={paginaAtual === totalPaginas}>
              Próxima
            </button>
          </div>
        )}
      </section>

      <section className="agenda-section">
        <Agenda partidas={agendaLtaSul} />
      </section>
    </div>
  );
};

export default CblolPage;
