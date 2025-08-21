import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Agenda from '../components/Agenda';
import './FreeFirePage.css';

const jogadores = [
  {
    nome: 'IGUINMVP',
    img: '/jogadores/IGUINMVP.jpg',
    // twitter: 'https://twitter.com/fNbLOL',
    // instagram: 'https://instagram.com/fNbLOL',
  },
  {
    nome: 'ITALO7',
    img: '/jogadores/ITALO7.jpg',
    // twitter: 'https://x.com/DoomLol11',
    // instagram: 'https://www.instagram.com/curse_lol1/',
  },
  {
    nome: 'ABREU',
    img: '/jogadores/ABREU.jpg',
    // twitter: 'https://x.com/1Kazelol',
    // instagram: 'https://www.instagram.com/kaze.g_/',
  },
  {
    nome: 'LUCASAWP',
    img: '/jogadores/LUCASAWP.jpg',
    // twitter: 'https://x.com/rabeloxv',
    // instagram: 'https://www.instagram.com/rabelokoo/',
  },
  {
    nome: 'ROJÃO',
    img: '/jogadores/ROJÃO.jpg',
    // twitter: 'https://x.com/frostylolx',
    // instagram: 'https://www.instagram.com/lolfrosty1/',
  },
   {
    nome: 'ERICK11',
    img: '/jogadores/ERICK11.jpg',
    // twitter: 'https://x.com/frostylolx',
    // instagram: 'https://www.instagram.com/lolfrosty1/',
  },
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
        const FreeFireNoticias = data
          .filter(n => n.categoria === 'FREEFIRE')
          .sort((a, b) => new Date(b.data) - new Date(a.data));
        setNoticiasFreeFire(FreeFireNoticias);
      } catch (error) {
        console.error('Erro ao carregar notícias de FREEFIRE:', error);
      }
    };

    const fetchAgenda = async () => {
      try {
        const res = await fetch(`${API_URL}/api/agenda`);
        const data = await res.json();
        const agendaFiltrada = data.filter(confronto => confronto.campeonato === 'FREEFIRE');
        setAgendaFreeFire(agendaFiltrada);
      } catch (error) {
        console.error('Erro ao carregar agenda da FREEFIRE:', error);
      }
    };

    fetchNoticias();
    fetchAgenda();
  }, [API_URL]);

  const totalPaginas = Math.ceil(noticiasFreeFire.length / noticiasPorPagina);
  const indiceInicio = (paginaAtual - 1) * noticiasPorPagina;
  const noticiasExibidas = noticiasFreeFire.slice(indiceInicio, indiceInicio + noticiasPorPagina);

  const irParaAnterior = () => {
    if (paginaAtual > 1) setPaginaAtual(paginaAtual - 1);
  };

  const irParaProxima = () => {
    if (paginaAtual < totalPaginas) setPaginaAtual(paginaAtual + 1);
  };

  return (
    <div className="pagina-freefire">
      <h1>RED Canids no FREEFIRE</h1>

      <section>
        <h2 className="freefire-section-title">Line-up</h2>
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

     <section>
  <h2 className="freefire-section-title">Últimos Confrontos</h2>
  <div className="video-list">
    {agendaFreeFire
  .filter(partida => partida.linkTransmissao)
  .sort((a, b) => new Date(b.data) - new Date(a.data))
  .slice(0, 2)
  .map((partida, index) => {
    const link = partida.linkTransmissao.replace("watch?v=", "embed/");
    return (
      <iframe
        key={index}
        src={link}
        title={`Confronto ${index + 1}`}
        allowFullScreen
      ></iframe>
    );
  })}
  </div>
</section>


      <section>
        <h2 className="freefire-section-title">Últimas Notícias da RED no FREEFIRE</h2>
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
        <Agenda partidas={agendaFreeFire} />
      </section>
    </div>
  );
};

export default FreeFirePage;
