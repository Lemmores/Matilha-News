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
  const noticiasPorPagina = 4;

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const res = await fetch(`${API_URL}/api/noticias`);
        const data = await res.json();
        const circuitoNoticias = data
          .filter(n => n.categoria === 'CIRCUITO DESAFIANTE')
          .sort((a, b) => new Date(b.data) - new Date(a.data));
        setNoticiasCircuito(circuitoNoticias);
      } catch (error) {
        console.error('Erro ao buscar notícias do Circuito Desafiante:', error);
      }
    };

    const fetchAgenda = async () => {
      try {
        const res = await fetch(`${API_URL}/api/agenda`);
        const data = await res.json();
        const agendaFiltrada = data.filter(partida => partida.campeonato === 'CIRCUITO DESAFIANTE');
        setAgendaCircuito(agendaFiltrada);
      } catch (error) {
        console.error('Erro ao carregar agenda do Circuito Desafiante:', error);
      }
    };

    fetchNoticias();
    fetchAgenda();
  }, [API_URL]);

  const totalPaginas = Math.ceil(noticiasCircuito.length / noticiasPorPagina);
  const indiceInicio = (paginaAtual - 1) * noticiasPorPagina;
  const noticiasExibidas = noticiasCircuito.slice(indiceInicio, indiceInicio + noticiasPorPagina);

  const irParaAnterior = () => { if (paginaAtual > 1) setPaginaAtual(paginaAtual - 1); };
  const irParaProxima = () => { if (paginaAtual < totalPaginas) setPaginaAtual(paginaAtual + 1); };

  // Função para transformar qualquer link do YouTube em embed
  const formatEmbedLink = (url) => {
    if (!url) return '';
    // live
    if (url.includes('/live/')) {
      const id = url.split('/live/')[1].split(/[?&]/)[0];
      return `https://www.youtube.com/embed/${id}?autoplay=0`;
    }
    // watch?v=
    if (url.includes('youtube.com/watch')) {
      const id = new URL(url).searchParams.get('v');
      return `https://www.youtube.com/embed/${id}?autoplay=0`;
    }
    // youtu.be
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1].split(/[?&]/)[0];
      return `https://www.youtube.com/embed/${id}?autoplay=0`;
    }
    return '';
  };

  return (
    <div className="pagina-circuito">
      <h1>RED Canids no Circuito Desafiante</h1>

      {/* Line-up */}
      <section>
        <h2 className="circuito-section-title">Line-up</h2>
        <div className="jogadores">
          {jogadores.map((j, idx) => (
            <div key={idx} className="jogador">
              <img src={j.img} alt={j.nome} onClick={() => setImagemAberta(j.img)} />
              <span>{j.nome}</span>
              <div className="social-buttons">
                {j.twitter && <a href={j.twitter} target="_blank" rel="noopener noreferrer" className="social-btn"><img src="/icons/x.png" alt="Twitter" /></a>}
                {j.instagram && <a href={j.instagram} target="_blank" rel="noopener noreferrer" className="social-btn"><img src="/icons/instagram.png" alt="Instagram" /></a>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {imagemAberta && (
        <div className="modal" onClick={() => setImagemAberta(null)}>
          <img src={imagemAberta} alt="Imagem ampliada" />
        </div>
      )}

      {/* Últimos Confrontos */}
      <section>
        <h2 className="circuito-section-title">Últimos Confrontos</h2>
        <div className="video-list">
          {agendaCircuito
            .filter(p => p.linkTransmissao)
            .sort((a, b) => new Date(b.data) - new Date(a.data))
            .slice(0, 2)
            .map((p, idx) => {
              const src = formatEmbedLink(p.linkTransmissao);
              return src ? <iframe key={idx} src={src} title={`Confronto ${idx + 1}`} allowFullScreen></iframe> : null;
            })}
        </div>
      </section>

      {/* Notícias */}
      <section>
        <h2 className="circuito-section-title">Últimas Notícias da RED no Circuito Desafiante</h2>
        <div className="noticia-list">
          {noticiasExibidas.map(n => (
            <Link key={n._id} to={`/noticia/${n._id}`} className="card-noticia">
              <img src={n.imagem} alt={n.titulo} />
              <p className="categoria">{n.categoria}</p>
              <h3>{n.titulo}</h3>
            </Link>
          ))}
        </div>
        {totalPaginas > 1 && (
          <div className="paginacao-noticias">
            <button onClick={irParaAnterior} disabled={paginaAtual === 1}>Anterior</button>
            <span>Página {paginaAtual} de {totalPaginas}</span>
            <button onClick={irParaProxima} disabled={paginaAtual === totalPaginas}>Próxima</button>
          </div>
        )}
      </section>

      {/* Agenda */}
      <section>
        <Agenda partidas={agendaCircuito} />
      </section>
    </div>
  );
};

export default CircuitoPage;
