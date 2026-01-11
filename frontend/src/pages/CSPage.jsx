import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Agenda from '../components/Agenda';
import './CSPage.css';

const jogadores = [
  { nome: 'HISTORY', img: '/jogadores/history.jpg', twitter: 'https://x.com/historyfps', instagram: 'https://www.instagram.com/historycsgo/' },
  { nome: 'DROP', img: '/jogadores/drop.jpg', twitter: 'https://x.com/dropcs__', instagram: 'https://www.instagram.com/dropcsgo_/' },
  { nome: 'KAUEZ', img: '/jogadores/kauez.jpg', twitter: 'https://x.com/kauezcs', instagram: 'https://www.instagram.com/kauezcsgo/' },
  { nome: 'PONTER', img: '/jogadores/ponter.jpg', twitter: 'https://x.com/ponterzin', instagram: 'https://www.instagram.com/ponterzin/' },
  { nome: 'VENOMZERA', img: '/jogadores/venomzera.jpg', twitter: 'https://x.com/venomzeracs', instagram: 'https://www.instagram.com/venomzeracs/' },
];

const CSPage = () => {
  const [imagemAberta, setImagemAberta] = useState(null);
  const [noticiasCS, setNoticiasCS] = useState([]);
  const [agendaCS, setAgendaCS] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
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

        setNoticiasCS(newsData
          .filter(n => n.categoria === 'CS2')
          .sort((a, b) => new Date(b.data) - new Date(a.data)));
        
        setAgendaCS(agendaData
          .filter(a => a.campeonato === 'CS2')
          .sort((a, b) => new Date(b.data) - new Date(a.data)));
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };
    fetchData();
  }, [API_URL]);

  const totalPaginas = Math.ceil(noticiasCS.length / noticiasPorPagina);
  const indiceInicio = (paginaAtual - 1) * noticiasPorPagina;
  const noticiasExibidas = noticiasCS.slice(indiceInicio, indiceInicio + noticiasPorPagina);

  const irParaAnterior = () => { if (paginaAtual > 1) setPaginaAtual(paginaAtual - 1); };
  const irParaProxima = () => { if (paginaAtual < totalPaginas) setPaginaAtual(paginaAtual + 1); };

  const formatEmbedLink = (url) => {
    if (!url) return '';
    const id = url.includes('/live/') ? url.split('/live/')[1].split(/[?&]/)[0] :
               url.includes('watch?v=') ? new URL(url).searchParams.get('v') :
               url.includes('youtu.be/') ? url.split('youtu.be/')[1].split(/[?&]/)[0] : null;
    return id ? `https://www.youtube.com/embed/${id}?autoplay=0` : '';
  };

  return (
    <div className="pagina-cs">
      <header className="header-cs">
        <h1>RED Canids no CS</h1>
        <p className="subtitle">COUNTER-STRIKE 2</p>
      </header>

      <section className="lineup-section">
        <h2 className="section-title">Line-up Oficial</h2>
        <div className="jogadores-container-horizontal">
          {jogadores.map((jogador, idx) => (
            <div key={idx} className="mini-player-card">
              <div className="mini-image-container">
                <img src={jogador.img} alt={jogador.nome} onClick={() => setImagemAberta(jogador.img)} />
                
                {/* Overlay Hover estilo Creators (Apenas PC) */}
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
                
                {/* Ícones Fixos (Apenas Mobile) */}
                <div className="social-mobile-only">
                   {jogador.twitter && <a href={jogador.twitter} target="_blank" rel="noopener noreferrer"><img src="/icons/x.png" alt="X" /></a>}
                   {jogador.instagram && <a href={jogador.instagram} target="_blank" rel="noopener noreferrer"><img src="/icons/instagram.png" alt="Instagram" /></a>}
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
          {agendaCS.filter(p => p.linkTransmissao).slice(0, 2).map((p, idx) => (
            <div key={idx} className="video-container-box">
              <iframe src={formatEmbedLink(p.linkTransmissao)} title={`Match ${idx}`} allowFullScreen></iframe>
            </div>
          ))}
        </div>
      </section>

      <section className="news-section">
        <h2 className="section-title">Notícias Relacionadas</h2>
        <div className="noticia-list">
          {noticiasExibidas.map(noticia => (
            <Link key={noticia._id} to={`/noticia/${noticia._id}`} className="card-noticia">
              <div className="news-img-container"><img src={noticia.imagem} alt={noticia.titulo} /></div>
              <div className="news-content">
                <p className="categoria">{noticia.categoria}</p>
                <h3>{noticia.titulo}</h3>
              </div>
            </Link>
          ))}
        </div>
        {totalPaginas > 1 && (
          <div className="paginacao-noticias">
            <button onClick={irParaAnterior} disabled={paginaAtual === 1}>Anterior</button>
            <span className="page-indicator">{paginaAtual} / {totalPaginas}</span>
            <button onClick={irParaProxima} disabled={paginaAtual === totalPaginas}>Próxima</button>
          </div>
        )}
      </section>

      <section className="agenda-section">
        <Agenda partidas={agendaCS} />
      </section>
    </div>
  );
};

export default CSPage;