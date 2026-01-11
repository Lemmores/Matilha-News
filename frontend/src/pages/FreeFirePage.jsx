import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Agenda from '../components/Agenda';
import './FreeFirePage.css';

const jogadores = [
  { nome: 'IGUINMVP', img: '/jogadores/IGUINMVP.jpg', instagram: 'https://www.instagram.com/iguin.mvp/' },
  { nome: 'ITALO7', img: '/jogadores/ITALO7.jpg', instagram: 'https://www.instagram.com/italosete7/' },
  { nome: 'LUCASAWP', img: '/jogadores/LUCASAWP.jpg', instagram: 'https://www.instagram.com/lucasawp7/' },
  { nome: 'ROJÃO', img: '/jogadores/ROJÃO.jpg', instagram: 'https://www.instagram.com/rojaowq/' },
  { nome: 'ERICK11', img: '/jogadores/ERICK11.jpg', instagram: 'https://www.instagram.com/erickonze/' },
  { nome: 'KOGA012', img: '/jogadores/KOGA012.jpg', instagram: 'https://www.instagram.com/koguinha012/' },
];

const FreeFirePage = () => {
  const [imagemAberta, setImagemAberta] = useState(null);
  const [noticiasFreeFire, setNoticiasFreeFire] = useState([]);
  const [agendaFreeFire, setAgendaFreeFire] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const noticiasPorPagina = 4;

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

        setNoticiasFreeFire(newsData.filter(n => n.categoria === 'FREEFIRE').sort((a, b) => new Date(b.data) - new Date(a.data)));
        setAgendaFreeFire(agendaData.filter(a => a.campeonato === 'FREEFIRE'));
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };
    fetchData();
  }, [API_URL]);

  const totalPaginas = Math.ceil(noticiasFreeFire.length / noticiasPorPagina);
  const noticiasExibidas = noticiasFreeFire.slice((paginaAtual - 1) * noticiasPorPagina, paginaAtual * noticiasPorPagina);

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
    <div className="pagina-freefire">
      <header className="header-freefire">
        <h1>RED Canids no Free Fire</h1>
        <p className="subtitle">MOBILE GAMING</p>
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
          {agendaFreeFire.filter(p => p.linkTransmissao).slice(0, 2).map((p, idx) => (
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
        {/* Imagem direta, sem div em volta */}
        <img src={noticia.imagem} alt={noticia.titulo} />
        
        {/* Elementos diretos para respeitar o layout da página de notícias */}
        <p className="categoria">{noticia.categoria}</p>
        <h3>{noticia.titulo}</h3>
        <p className="conteudo">{noticia.conteudo}</p>
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
        <Agenda partidas={agendaFreeFire} />
      </section>
    </div>
  );
};

export default FreeFirePage;