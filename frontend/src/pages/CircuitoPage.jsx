import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Agenda from '../components/Agenda';
import './CircuitoPage.css';

const jogadores = [
  { nome: 'ZYNTS', img: '/jogadores/zynts.jpg', twitter: 'https://twitter.com/zyntsLOL', instagram: 'https://www.instagram.com/matheuszynts1/' },
  { nome: 'NERO', img: '/jogadores/Nero.jpg', twitter: 'https://x.com/nerothefik', instagram: 'https://www.instagram.com/nerothefik/' },
  { nome: 'MAGO', img: '/jogadores/mago.jpg', twitter: 'https://x.com/jeanmag0', instagram: 'https://www.instagram.com/jeanmagolol/' },
  { nome: 'KOJIMA', img: '/jogadores/Kojima.jpg', twitter: 'https://x.com/kojimalol1', instagram: 'https://www.instagram.com/caio__y/' },
  { nome: 'UZENT', img: '/jogadores/uzent.jpg', twitter: 'https://x.com/uzentLOL', instagram: 'https://www.instagram.com/matheus_uzent/' },
];

const CircuitoPage = () => {
  const [imagemAberta, setImagemAberta] = useState(null);
  const [noticiasCircuito, setNoticiasCircuito] = useState([]);
  const [agendaCircuito, setAgendaCircuito] = useState([]);
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

        setNoticiasCircuito(newsData
          .filter(n => n.categoria === 'CIRCUITO DESAFIANTE')
          .sort((a, b) => new Date(b.data) - new Date(a.data)));
        
        setAgendaCircuito(agendaData
          .filter(a => a.campeonato === 'CIRCUITO DESAFIANTE'));
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };
    fetchData();
  }, [API_URL]);

  const totalPaginas = Math.ceil(noticiasCircuito.length / noticiasPorPagina);
  const indiceInicio = (paginaAtual - 1) * noticiasPorPagina;
  const noticiasExibidas = noticiasCircuito.slice(indiceInicio, indiceInicio + noticiasPorPagina);

  const irParaAnterior = () => { if (paginaAtual > 1) setPaginaAtual(paginaAtual - 1); };
  const irParaProxima = () => { if (paginaAtual < totalPaginas) setPaginaAtual(paginaAtual + 1); };

  const formatEmbedLink = (url) => {
    if (!url) return '';
    const id = url.includes('/live/') ? url.split('/live/')[1].split(/[?&]/)[0] :
               url.includes('watch?v=') ? new URL(url).searchParams.get('v') :
               url.includes('youtu.be/') ? url.split('youtu.be/')[1].split(/[?&]/)[0] : null;
    return id ? `https://www.youtube.com/embed/${id}` : '';
  };

  return (
    <div className="pagina-circuito">
      <header className="header-circuito">
        <h1>RED CANIDS NO CIRCUITÃO</h1>
        <p className="subtitle">LEAGUE OF LEGENDS</p>
      </header>

      <section className="lineup-section">
        <h2 className="section-title">Line-up Oficial</h2>
        {/* Container centralizado para os 5 cards */}
        <div className="jogadores-container-horizontal">
          {jogadores.map((jogador, idx) => (
            <div key={idx} className="mini-player-card">
              <div className="mini-image-container">
                <img 
                  src={jogador.img} 
                  alt={jogador.nome} 
                  onClick={() => setImagemAberta(jogador.img)} 
                />
                
                {/* Ícones de Hover (PC) */}
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
                
                {/* Ícones Fixos (Mobile) */}
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
          {agendaCircuito.filter(p => p.linkTransmissao).slice(0, 2).map((p, idx) => (
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
        <Agenda partidas={agendaCircuito} />
      </section>
    </div>
  );
};

export default CircuitoPage;