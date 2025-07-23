import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Agenda from '../components/Agenda';
import './LtaSulPage.css';

const jogadores = [
  {
    nome: 'FNB',
    img: '/jogadores/fnb.jpg',
    twitter: 'https://twitter.com/fNbLOL',
    instagram: 'https://instagram.com/fNbLOL',
  },
  {
    nome: 'DOOM',
    img: '/jogadores/doom.jpg',
    twitter: 'https://x.com/DoomLol11',
    instagram: 'https://www.instagram.com/curse_lol1/',
  },
  {
    nome: 'KAZE',
    img: '/jogadores/kaze.jpg',
    twitter: 'https://x.com/1Kazelol',
    instagram: 'https://www.instagram.com/kaze.g_/',
  },
  {
     nome: 'RABELO',
    img: '/jogadores/rabelo.jpg',
    twitter: 'https://x.com/rabeloxv',
    instagram: 'https://www.instagram.com/rabelokoo/',
  },
  {
    nome: 'FROSTY',
    img: '/jogadores/frosty.jpg',
    twitter: 'https://x.com/frostylolx',
    instagram: 'https://www.instagram.com/lolfrosty1/',
  },
];

const LtaSulPage = () => {
  const [imagemAberta, setImagemAberta] = useState(null);
  const [noticiasLtaSul, setNoticiasLtaSul] = useState([]);
  const [agendaLtaSul, setAgendaLtaSul] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const res = await fetch(`${API_URL}/api/noticias`);
        const data = await res.json();
        const ltaSulNoticias = data.filter(n => n.categoria === 'LTA SUL');
        setNoticiasLtaSul(ltaSulNoticias);
      } catch (error) {
        console.error('Erro ao carregar notícias da LTA SUL:', error);
      }
    };

    const fetchAgenda = async () => {
      try {
        const res = await fetch(`${API_URL}/api/agenda`);
        const data = await res.json();
        const agendaFiltrada = data.filter(confronto => confronto.campeonato === 'LTA SUL');
        setAgendaLtaSul(agendaFiltrada);
      } catch (error) {
        console.error('Erro ao carregar agenda da LTA SUL:', error);
      }
    };

    fetchNoticias();
    fetchAgenda();
  }, [API_URL]);

  return (
    <div className="pagina-lta">
      <h1>RED Canids na LTA SUL</h1>

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
          <iframe
            src="https://www.youtube.com/embed/N428VJVA1JI?si=_WVQ4p99Md8znk0p"
            title="Confronto 1"
            allowFullScreen
          ></iframe>
          <iframe
            src="https://www.youtube.com/embed/JueCMvwKBEQ?si=F-RZVfEQrxG7BAID"
            title="Confronto 2"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      <section>
        <h2 className="lta-section-title">Últimas Notícias da RED na LTA SUL</h2>
        <div className="noticia-list">
          {noticiasLtaSul.map(noticia => (
            <Link key={noticia._id} to={`/noticia/${noticia._id}`} className="card-noticia">
              <img src={noticia.imagem} alt={noticia.titulo} />
              <p className="categoria">{noticia.categoria}</p>
              <h3>{noticia.titulo}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <Agenda partidas={agendaLtaSul} />
      </section>
    </div>
  );
};

export default LtaSulPage;
