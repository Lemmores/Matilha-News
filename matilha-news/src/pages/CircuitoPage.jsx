import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Agendacircuito from '../components/AgendaCircuito';
import './CircuitoPage.css';

const jogadores = [
  { nome: 'zynts', img: '/jogadores/zynts.jpg' },
  { nome: 'DOOM', img: '/jogadores/doom.jpg' },
  { nome: 'Kaze', img: '/jogadores/kaze.jpg' },
  { nome: 'Rabelo', img: '/jogadores/rabelo.jpg' },
  { nome: 'uZent', img: '/jogadores/uzent.jpg' },
];

const noticiasExemplo = [
  { id: 9, imagem: "/foto9.jpg", titulo: "RED encara a TBK Esports pelo Challengers Brazil nesta quarta (04)", categoria: "VALORANT" },
  { id: 7, imagem: "/news7.jpg", titulo: "RED Canids Kalunga vence a VKS e está na final do Circuito Desafiante!", categoria: "CIRCUITO DESAFIANTE" },
  { id: 8, imagem: "/news8.jpg", titulo: "Donos da RED prometem reformulação após queda na LTA SUL", categoria: "LTA SUL" },
  { id: 6, imagem: "/news6.jpg", titulo: "RED Canids Kalunga é eliminada pela Vivo Keyd Stars na LTA Sul 2025", categoria: "LTA SUL" },
  { id: 1, titulo: 'RED Canids enfrentará a Vivo Keyd Stars valendo a vida na LTA SUL!', categoria: 'LTA SUL', imagem: '/news1.jpg' },
  { id: 2, imagem: "/news2.jpg", titulo: "RED enfrenta a Vivo Keyd Stars na final da upper", categoria: "CIRCUITO DESAFIANTE" },
  { id: 3, titulo: 'RED Canids Kalunga lança vídeo divertido mostrando os bastidores da preparação do Academy para a final da Upper no Circuito Desafiante', categoria: 'CIRCUITO DESAFIANTE', imagem: '/news3.jpg' },
  { id: 4, titulo: 'RED Canids Academy enfrenta paiN Gaming Academy valendo vaga na final da Série A da Gamers Club', categoria: 'CS2', imagem: '/news4.jpg' },
  { id: 5, imagem: "/news5.jpg", titulo: "RED estreia com vitória pra cima do atual campeão!", categoria: "VALORANT" },
];

const CircuitoPage = () => {
  const [imagemAberta, setImagemAberta] = useState(null);
  const noticiascircuitoSul = noticiasExemplo.filter(n => n.categoria === "CIRCUITO DESAFIANTE");

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
          {noticiascircuitoSul.map(noticia => (
            <Link key={noticia.id} to={`/noticia/${noticia.id}`} className="card-noticia">
              <img src={noticia.imagem} alt={noticia.titulo} />
              <h3>{noticia.titulo}</h3>
              <p className="categoria">{noticia.categoria}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Agenda com componente */}
      <Agendacircuito />

      {/* Tabela (com clique para abrir modal) */}
      <section className="tabela-img">
        <h2 className="circuito-section-title">Tabela Circuito Desafiante</h2>
        <img
          src="/tabelacircuito2.jpg"
          alt="Tabela do Circuito Desafiante"
          onClick={() => setImagemAberta("/tabelacircuito2.jpg")}
          style={{ cursor: 'pointer' }}
        />
      </section>
    </div>
  );
};

export default CircuitoPage;
