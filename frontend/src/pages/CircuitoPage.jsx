import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Agenda from '../components/Agenda';
import './CircuitoPage.css';

const jogadores = [
  {
    nome: 'ZYNTS',
    img: '/jogadores/zynts.jpg',
    twitter: 'https://twitter.com/zyntsLOL',
    instagram: 'https://www.instagram.com/matheuszynts1/',
  },
  {
    nome: 'NERO',
    img: '/jogadores/Nero.jpg',
    twitter: 'https://x.com/nerothefik',
    instagram: 'https://www.instagram.com/nerothefik/',
  },
  {
    nome: 'MAGO',
    img: '/jogadores/mago.jpg',
    twitter: 'https://x.com/jeanmag0',
    instagram: 'https://www.instagram.com/jeanmagolol/',
  },
  {
    nome: 'KOJIMA',
    img: '/jogadores/Kojima.jpg',
    twitter: 'https://x.com/kojimalol1',
    instagram: 'https://www.instagram.com/caio__y/',
  },
  {
    nome: 'UZENT',
    img: '/jogadores/uzent.jpg',
    twitter: 'https://x.com/uzentLOL',
    instagram: 'https://www.instagram.com/matheus_uzent/',
  },
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

  // calcular quais notícias mostrar na página atual
  const indexUltimaNoticia = paginaAtual * noticiasPorPagina;
  const indexPrimeiraNoticia = indexUltimaNoticia - noticiasPorPagina;
  const noticiasPagina = noticiasCircuito.slice(indexPrimeiraNoticia, indexUltimaNoticia);

  // total de páginas
  const totalPaginas = Math.ceil(noticiasCircuito.length / noticiasPorPagina);

  // funções para mudar página
  const irParaProxima = () => {
    if (paginaAtual < totalPaginas) setPaginaAtual(paginaAtual + 1);
  };

  const irParaAnterior = () => {
    if (paginaAtual > 1) setPaginaAtual(paginaAtual - 1);
  };

  return (
    <div className="pagina-circuito">
      <h1>RED Canids no Circuito Desafiante</h1>

      {/* Line-up dos Jogadores */}
      <section>
        <h2 className="circuito-section-title">Line-up</h2>
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
                  <a
                    href={jogador.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                  >
                    <img src="/icons/x.png" alt="Twitter" />
                  </a>
                )}
                {jogador.instagram && (
                  <a
                    href={jogador.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                  >
                    <img src="/icons/instagram.png" alt="Instagram" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal da Imagem Ampliada */}
      {imagemAberta && (
        <div className="modal" onClick={() => setImagemAberta(null)}>
          <img src={imagemAberta} alt="Imagem ampliada" />
        </div>
      )}

      {/* Vídeos Recentes */}
      <section>
        <h2 className="circuito-section-title">Últimos Confrontos</h2>
        <div className="video-list">
          {agendaCircuito
  .filter(partida => partida.linkTransmissao)
  .sort((a, b) => new Date(b.data) - new Date(a.data))
  .slice(0, 2)
  .map((partida, index) => {
    let link = partida.linkTransmissao;

    if (link.includes("watch?v=")) {
      const videoId = link.split("watch?v=")[1].split("&")[0]; // pega só o ID
      link = `https://www.youtube.com/embed/${videoId}`;
    }

    return (
      <iframe
        key={index}
        src={link}
        title={`Confronto ${index + 1}`}
        width="560"
        height="315"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    );
  })}

        </div>
      </section>

      {/* Notícias do Circuito com paginação */}
      <section>
        <h2 className="circuito-section-title">Últimas Notícias da RED no Circuito Desafiante</h2>
        <div className="noticia-list">
          {noticiasPagina.map(noticia => (
            <Link key={noticia._id} to={`/noticia/${noticia._id}`} className="card-noticia">
              <img src={noticia.imagem} alt={noticia.titulo} />
              <p className="categoria">{noticia.categoria}</p>
              <h3>{noticia.titulo}</h3>
            </Link>
          ))}
        </div>

        {/* Botões de navegação de página */}
        <div className="paginacao-noticias">
          <button onClick={irParaAnterior} disabled={paginaAtual === 1}>
            Página Anterior
          </button>
          <span>Página {paginaAtual} de {totalPaginas}</span>
          <button onClick={irParaProxima} disabled={paginaAtual === totalPaginas}>
            Próxima Página
          </button>
        </div>
      </section>

      {/* Agenda do Circuito Desafiante */}
      <section>
        <Agenda partidas={agendaCircuito} />
      </section>
    </div>
  );
};

export default CircuitoPage;
