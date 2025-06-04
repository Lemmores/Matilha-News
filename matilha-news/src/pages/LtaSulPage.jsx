import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AgendaLTA from '../components/AgendaLTA';
import './LtaSulPage.css';

const jogadores = [
  { nome: 'fNb', img: '/jogadores/fnb.jpg' },
  { nome: 'Aegis', img: '/jogadores/aegis.jpg' },
  { nome: 'Grevthar', img: '/jogadores/grevthar.jpg' },
  { nome: 'Brance', img: '/jogadores/brance.jpg' },
  { nome: 'Frosty', img: '/jogadores/frosty.jpg' },
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

const LtaSulPage = () => {
  const [imagemAberta, setImagemAberta] = useState(null);
  const noticiasLtaSul = noticiasExemplo.filter(n => n.categoria === "LTA SUL");

  return (
    <div className="pagina-lta">
      <h1>RED Canids na LTA SUL</h1>

      {/* Line-up dos Jogadores */}
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

      {/* Notícias da LTA SUL */}
      <section>
        <h2 className="lta-section-title">Últimas Notícias da RED na LTA SUL</h2>
        <div className="noticia-list">
          {noticiasLtaSul.map(noticia => (
            <Link key={noticia.id} to={`/noticia/${noticia.id}`} className="card-noticia">
              <img src={noticia.imagem} alt={noticia.titulo} />
              <h3>{noticia.titulo}</h3>
              <p className="categoria">{noticia.categoria}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Agenda com componente */}
      <AgendaLTA />

      {/* Tabela (com clique para abrir modal) */}
      <section className="tabela-img">
        <h2 className="lta-section-title">Tabela LTA SUL</h2>
        <img
          src="/tabelalta.jpeg"
          alt="Tabela da LTA SUL"
          onClick={() => setImagemAberta("/tabelalta.jpeg")}
          style={{ cursor: 'pointer' }}
        />
      </section>
    </div>
  );
};

export default LtaSulPage;
