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
    const fetchNoticias = async () => {
      try {
        const res = await fetch(`${API_URL}/api/noticias`);
        const data = await res.json();
        const filtradas = data
          .filter(n => n.categoria === 'FREEFIRE')
          .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
        setNoticiasFreeFire(filtradas);
      } catch (error) {
        console.error('Erro ao carregar notícias de Free Fire:', error);
      }
    };

    const fetchAgenda = async () => {
      try {
        const res = await fetch(`${API_URL}/api/agenda`);
        const data = await res.json();
        const agendaFiltrada = data.filter(confronto => confronto.campeonato === 'FREEFIRE');
        setAgendaFreeFire(agendaFiltrada);
      } catch (error) {
        console.error('Erro ao carregar agenda de Free Fire:', error);
      }
    };

    fetchNoticias();
    fetchAgenda();
  }, [API_URL]);

  const totalPaginas = Math.ceil(noticiasFreeFire.length / noticiasPorPagina);
  const noticiasExibidas = noticiasFreeFire.slice((paginaAtual - 1) * noticiasPorPagina, paginaAtual * noticiasPorPagina);

  const formatEmbedLink = (url) => {
    if (!url) return '';
    const id = url.includes('watch?v=') ? new URL(url).searchParams.get('v') : url.split('.be/')[1];
    return id ? `https://www.youtube.com/embed/${id}` : '';
  };

  return (
    <div className="pagina-freefire">
      <header className="header-freefire">
        <h1>RED Canids Free Fire</h1>
        <p className="subtitle">MOBILE SQUAD</p>
      </header>

      <section>
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

      <section className="videos-section">
        <h2 className="section-title">Últimos Confrontos</h2>
        <div className="video-grid">
          {agendaFreeFire
            .filter(p => p.linkTransmissao)
            .sort((a, b) => new Date(b.data) - new Date(a.data))
            .slice(0, 2)
            .map((p, idx) => (
              <iframe key={idx} src={formatEmbedLink(p.linkTransmissao)} title="Match" allowFullScreen className="video-iframe"></iframe>
            ))}
        </div>
      </section>

      <section className="news-section">
        <h2 className="section-title">Notícias</h2>
        <div className="noticia-list">
          {noticiasExibidas.map(n => (
            <Link key={n._id} to={`/noticia/${n._id}`} className="card-noticia">
              <div className="news-img-container">
                <img src={n.imagem} alt={n.titulo} />
              </div>
              <div className="news-content">
                <p className="categoria">{n.categoria}</p>
                <h3>{n.titulo}</h3>
              </div>
            </Link>
          ))}
        </div>
        {totalPaginas > 1 && (
          <div className="paginacao-noticias">
            <button onClick={() => setPaginaAtual(p => p - 1)} disabled={paginaAtual === 1}>Anterior</button>
            <span className="page-indicator">{paginaAtual} / {totalPaginas}</span>
            <button onClick={() => setPaginaAtual(p => p + 1)} disabled={paginaAtual === totalPaginas}>Próxima</button>
          </div>
        )}
      </section>

      <Agenda partidas={agendaFreeFire} />
    </div>
  );
};

export default FreeFirePage;