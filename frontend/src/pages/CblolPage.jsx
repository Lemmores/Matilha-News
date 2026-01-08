import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Agenda from '../components/Agenda';
import './CblolPage.css';

const jogadores = [
  { nome: 'FNB', img: '/jogadores/fnb.jpg', twitter: 'https://twitter.com/fNbLOL', instagram: 'https://instagram.com/fNbLOL' },
  { nome: 'DOOM', img: '/jogadores/Doom.jpg', twitter: 'https://x.com/DoomLol11', instagram: 'https://www.instagram.com/curse_lol1/' },
  { nome: 'KAZE', img: '/jogadores/Kaze.jpg', twitter: 'https://x.com/1Kazelol', instagram: 'https://www.instagram.com/kaze.g_/' },
  { nome: 'RABELO', img: '/jogadores/Rabelo.jpg', twitter: 'https://x.com/rabeloxv', instagram: 'https://www.instagram.com/rabelokoo/' },
  { nome: 'FROSTY', img: '/jogadores/Frosty.jpg', twitter: 'https://x.com/frostylolx', instagram: 'https://www.instagram.com/lolfrosty1/' },
];

const CblolPage = () => {
  const [imagemAberta, setImagemAberta] = useState(null);
  const [noticiasLtaSul, setNoticiasLtaSul] = useState([]);
  const [agendaLtaSul, setAgendaLtaSul] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const noticiasPorPagina = 4;

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const res = await fetch(`${API_URL}/api/noticias`);
        const data = await res.json();
        const ltaSulNoticias = data
          .filter(n => n.categoria === 'CBLOL')
          .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
        setNoticiasLtaSul(ltaSulNoticias);
      } catch (error) {
        console.error('Erro ao carregar notícias do CBLOL:', error);
      }
    };

    const fetchAgenda = async () => {
      try {
        const res = await fetch(`${API_URL}/api/agenda`);
        const data = await res.json();
        const agendaFiltrada = data
          .filter(confronto => confronto.campeonato === 'CBLOL')
          .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
        setAgendaLtaSul(agendaFiltrada);
      } catch (error) {
        console.error('Erro ao carregar agenda do CBLOL:', error);
      }
    };

    fetchNoticias();
    fetchAgenda();
  }, [API_URL]);

  const totalPaginas = Math.ceil(noticiasLtaSul.length / noticiasPorPagina);
  const indiceInicio = (paginaAtual - 1) * noticiasPorPagina;
  const noticiasExibidas = noticiasLtaSul.slice(indiceInicio, indiceInicio + noticiasPorPagina);

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
    <div className="pagina-cblol">
      <header className="header-cblol">
        <h1>RED Canids no CBLOL</h1>
        <p className="subtitle">LEAGUE OF LEGENDS</p>
      </header>

      {/* Line-up Estilo Creators */}
      <section className="lineup-section">
        <h2 className="section-title">Line-up Oficial</h2>
        <div className="jogadores-grid">
          {jogadores.map((jogador, idx) => (
            <div key={idx} className="player-card">
              <div className="image-container">
                <img src={jogador.img} alt={jogador.nome} onClick={() => setImagemAberta(jogador.img)} />
              </div>
              
              <div className="player-footer">
                <span className="player-name">{jogador.nome}</span>
                <span className="player-role">PRO PLAYER</span>
                
                <div className="social-overlay">
                  {jogador.twitter && (
                    <a href={jogador.twitter} target="_blank" rel="noopener noreferrer" className="social-icon">
                      <img src="/icons/x.png" alt="X" />
                    </a>
                  )}
                  {jogador.instagram && (
                    <a href={jogador.instagram} target="_blank" rel="noopener noreferrer" className="social-icon">
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
            <button className="close-modal">X</button>
          </div>
        </div>
      )}

      {/* Vídeos e Confrontos */}
      <section className="videos-section">
        <h2 className="section-title">Últimos Confrontos</h2>
        <div className="video-grid">
          {agendaLtaSul
            .filter(p => p.linkTransmissao)
            .slice(0, 2)
            .map((p, idx) => {
              const src = formatEmbedLink(p.linkTransmissao);
              return src ? <iframe key={idx} src={src} title={`Confronto ${idx + 1}`} allowFullScreen className="video-iframe"></iframe> : null;
            })}
        </div>
      </section>

      {/* Notícias */}
      <section className="news-section">
        <h2 className="section-title">Notícias Relacionadas</h2>
        <div className="noticia-list">
          {noticiasExibidas.map(noticia => (
            <Link key={noticia._id} to={`/noticia/${noticia._id}`} className="card-noticia">
              <div className="news-img-container">
                <img src={noticia.imagem} alt={noticia.titulo} />
              </div>
              <div className="news-content">
                <p className="categoria">{noticia.categoria}</p>
                <h3>{noticia.titulo}</h3>
                <small>{new Date(noticia.data).toLocaleDateString('pt-BR')}</small>
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
        <Agenda partidas={agendaLtaSul} />
      </section>
    </div>
  );
};

export default CblolPage;