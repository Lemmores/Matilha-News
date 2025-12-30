import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Agenda from '../components/Agenda';
import './CblolPage.css';

const jogadores = [
  {
    nome: 'FNB',
    img: '/jogadores/fnb.jpg',
    twitter: 'https://twitter.com/fNbLOL',
    instagram: 'https://instagram.com/fNbLOL',
  },
  {
    nome: 'DOOM',
    img: '/jogadores/Doom.jpg',
    twitter: 'https://x.com/DoomLol11',
    instagram: 'https://www.instagram.com/curse_lol1/',
  },
  {
    nome: 'KAZE',
    img: '/jogadores/Kaze.jpg',
    twitter: 'https://x.com/1Kazelol',
    instagram: 'https://www.instagram.com/kaze.g_/',
  },
  {
    nome: 'RABELO',
    img: '/jogadores/Rabelo.jpg',
    twitter: 'https://x.com/rabeloxv',
    instagram: 'https://www.instagram.com/rabelokoo/',
  },
  {
    nome: 'FROSTY',
    img: '/jogadores/Frosty.jpg',
    twitter: 'https://x.com/frostylolx',
    instagram: 'https://www.instagram.com/lolfrosty1/',
  },
];

const LtaSulPage = () => {
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
          .sort((a, b) => {
            // Converte "DD/MM/YYYY" para "YYYY-MM-DD" antes de criar Date
            const [diaA, mesA, anoA] = a.data.split('/');
            const [diaB, mesB, anoB] = b.data.split('/');
            const dateA = new Date(`${anoA}-${mesA}-${diaA}`).getTime();
            const dateB = new Date(`${anoB}-${mesB}-${diaB}`).getTime();
            return dateB - dateA;
          });
        setNoticiasLtaSul(ltaSulNoticias);
      } catch (error) {
        console.error('Erro ao carregar notícias do CBLOL:', error);
      }
    };

    const fetchAgenda = async () => {
      try {
        const res = await fetch(`${API_URL}/api/agenda`);
        const data = await res.json();
        const agendaFiltrada = data.filter(confronto => confronto.campeonato === 'CBLOL');
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

  const irParaAnterior = () => {
    if (paginaAtual > 1) setPaginaAtual(paginaAtual - 1);
  };

  const irParaProxima = () => {
    if (paginaAtual < totalPaginas) setPaginaAtual(paginaAtual + 1);
  };

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
    <div className="pagina-lta">
      <h1>RED Canids no CBLOL</h1>

      <section>
        <h2 className="lta-section-title">Line-up</h2>
        <div className="jogadores">
          {jogadores.map((jogador, idx) => (
            <div key={idx} className="jogador">
              <img
                src={jogador.img}
                alt={jogador.nome}
                onClick={() => setImagemAberta(jogador.img)}
              />
              <span>{jogador.nome}</span>
              <div className="social-buttons">
                {jogador.twitter && (
                  <a href={jogador.twitter} target="_blank" rel="noopener noreferrer" className="social-btn">
                    <img src="/icons/x.png" alt="Twitter" />
                  </a>
                )}
                {jogador.instagram && (
                  <a href={jogador.instagram} target="_blank" rel="noopener noreferrer" className="social-btn">
                    <img src="/icons/instagram.png" alt="Instagram" />
                  </a>
                )}
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
        <h2 className="lta-section-title">Últimos Confrontos</h2>
        <div className="video-list">
          {agendaLtaSul
            .filter(p => p.linkTransmissao)
            .sort((a, b) => {
              const [diaA, mesA, anoA] = a.data.split('/');
              const [diaB, mesB, anoB] = b.data.split('/');
              const dateA = new Date(`${anoA}-${mesA}-${diaA}`).getTime();
              const dateB = new Date(`${anoB}-${mesB}-${diaB}`).getTime();
              return dateB - dateA;
            })
            .slice(0, 2)
            .map((p, idx) => {
              console.log('Link do YouTube:', p.linkTransmissao);
              const src = formatEmbedLink(p.linkTransmissao);
              return src ? <iframe key={idx} src={src} title={`Confronto ${idx + 1}`} allowFullScreen></iframe> : null;
            })}
        </div>
      </section>

      <section>
        <h2 className="lta-section-title">Últimas Notícias da RED na LTA SUL</h2>
        <div className="noticia-list">
          {noticiasExibidas.map(noticia => (
            <Link key={noticia._id} to={`/noticia/${noticia._id}`} className="card-noticia">
              <img src={noticia.imagem} alt={noticia.titulo} />
              <p className="categoria">{noticia.categoria}</p>
              <h3>{noticia.titulo}</h3>
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

      <section>
        <Agenda partidas={agendaLtaSul} />
      </section>
    </div>
  );
};

export default CblolPage;
