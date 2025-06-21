import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Agendacircuito from '../components/AgendaCircuito';
import './CircuitoPage.css';

const jogadores = [
  {
    nome: 'zynts',
    img: '/jogadores/zynts.jpg',
    twitter: 'https://twitter.com/zyntsLOL',
    instagram: 'https://www.instagram.com/matheuszynts1/',
  },
  {
    nome: 'DOOM',
    img: '/jogadores/doom.jpg',
    twitter: 'https://x.com/DoomLol11',
    instagram: 'https://www.instagram.com/curse_lol1/',
  },
  {
    nome: 'Kaze',
    img: '/jogadores/kaze.jpg',
    twitter: 'https://x.com/1Kazelol',
    instagram: 'https://www.instagram.com/kaze.g_/',
  },
  {
    nome: 'Rabelo',
    img: '/jogadores/rabelo.jpg',
    twitter: 'https://x.com/rabeloxv',
    instagram: 'https://www.instagram.com/rabelokoo/',
  },
  {
    nome: 'uZent',
    img: '/jogadores/uzent.jpg',
    twitter: 'https://x.com/uzentLOL',
    instagram: 'https://www.instagram.com/matheus_uzent/',
  },
];

const CircuitoPage = () => {
  const [imagemAberta, setImagemAberta] = useState(null);
  const [noticiasCircuito, setNoticiasCircuito] = useState([]);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/noticias');
        const data = await res.json();

        const circuitoNoticias = data.filter(n => n.categoria === 'CIRCUITO DESAFIANTE');
        setNoticiasCircuito(circuitoNoticias);
      } catch (error) {
        console.error('Erro ao buscar notícias do Circuito Desafiante:', error);
      }
    };

    fetchNoticias();
  }, []);

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
            src="https://www.youtube.com/embed/dL78jDWGVSA?si=OvbVjqJFHYUCqRej"
            title="Confronto 1"
            allowFullScreen
          ></iframe>
          <iframe 
            src="https://www.youtube.com/embed/M-OiejvRbLY?si=sV0VTlvEd7HIClC-" 
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
              <img src={`http://localhost:5000${noticia.imagem}`} alt={noticia.titulo} />
              <p className="categoria">{noticia.categoria}</p>
              <h3>{noticia.titulo}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Agenda com componente */}
      <Agendacircuito />

      {/* Tabela
      <section className="tabela-img">
        <h2 className="circuito-section-title">Tabela Circuito Desafiante</h2>
        <img
          src="/tabelacircuito2.jpg"
          alt="Tabela do Circuito Desafiante"
          onClick={() => setImagemAberta("/tabelacircuito2.jpg")}
          style={{ cursor: 'pointer' }}
        />
      </section> */}
    </div>
  );
};

export default CircuitoPage;
