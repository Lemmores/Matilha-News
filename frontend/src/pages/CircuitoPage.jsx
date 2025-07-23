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
    img: '/jogadores/doom.jpg',
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
    img: '/jogadores/rabelo.jpg',
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

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const res = await fetch(`${API_URL}/api/noticias`);
        const data = await res.json();
        const circuitoNoticias = data.filter(n => n.categoria === 'CIRCUITO DESAFIANTE');
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
          <iframe 
            src="https://www.youtube.com/embed/lznTj-7coyc?si=jbSq8bN8fAOO0k20&amp;start=2307"
            title="Confronto 1"
            allowFullScreen
          ></iframe>
          <iframe 
            src="https://www.youtube.com/embed/bbeiB4ZU9WI?si=YxiuIEH50X66CKpm&amp;start=10895" 
            title="Confronto 2"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Notícias do Circuito */}
      <section>
        <h2 className="circuito-section-title">Últimas Notícias da RED no Circuito Desafiante</h2>
        <div className="noticia-list">
          {noticiasCircuito.map(noticia => (
            <Link key={noticia._id} to={`/noticia/${noticia._id}`} className="card-noticia">
              <img src={noticia.imagem} alt={noticia.titulo} />
              <p className="categoria">{noticia.categoria}</p>
              <h3>{noticia.titulo}</h3>
            </Link>
          ))}
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
