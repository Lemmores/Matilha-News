import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Agenda from '../components/Agenda';
import './CSPage.css';

const jogadores = [
  {
    nome: 'HISTORY',
    img: '/jogadores/history.jpg',
    twitter: 'https://x.com/historyfps',
    instagram: 'https://www.instagram.com/historycsgo/',
  },
  {
    nome: 'DROP',
    img: '/jogadores/drop.jpg',
    twitter: 'https://x.com/dropcs__',
    instagram: 'https://www.instagram.com/dropcsgo_',
  },
  {
    nome: 'KAUEZ',
    img: '/jogadores/kauez.jpg',
    twitter: 'https://x.com/kauezcs',
    instagram: 'https://www.instagram.com/kauezcsgo/',
  },
  {
    nome: 'PONTER',
    img: '/jogadores/ponter.jpg',
    twitter: 'https://x.com/ponterzin',
    instagram: 'https://www.instagram.com/ponterzin/',
  },
  {
    nome: 'VENOMZERA',
    img: '/jogadores/venomzera.jpg',
    twitter: 'https://x.com/venomzeracs',
    instagram: 'https://www.instagram.com/venomzeracs/',
  },
];

const CSPage = () => {
  const [imagemAberta, setImagemAberta] = useState(null);
  const [noticiasCS, setNoticiasCS] = useState([]);
  const [agendaCS, setAgendaCS] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const res = await fetch(`${API_URL}/api/noticias`);
        const data = await res.json();
        const CSNoticias = data.filter(n => n.categoria === 'CS2');
        setNoticiasCS(CSNoticias);
      } catch (error) {
        console.error('Erro ao carregar notícias de CS2:', error);
      }
    };

    const fetchAgenda = async () => {
      try {
        const res = await fetch(`${API_URL}/api/agenda`);
        const data = await res.json();
        const agendaFiltrada = data.filter(confronto => confronto.campeonato === 'CS2');
        setAgendaCS(agendaFiltrada);
      } catch (error) {
        console.error('Erro ao carregar agenda de CS2:', error);
      }
    };

    fetchNoticias();
    fetchAgenda();
  }, [API_URL]);

  return (
    <div className="pagina-cs">
      <h1>RED Canids no CS2</h1>

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

           <section>
  <h2 className="lta-section-title">Últimos Confrontos</h2>
  <div className="video-list">
    {agendaCS
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
              <h2 className="cs-section-title">Últimas Notícias da RED no CS2</h2>
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
        <Agenda partidas={agendaCS} />
      </section>
    </div>
  );
};

export default CSPage;
