import './Noticias.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const noticiasExemplo = [
  { id: 1, titulo: 'RED Canids enfrentará a Vivo Keyd Stars valendo a vida na LTA SUL!', categoria: 'LTA SUL', imagem: '/news1.jpg' },
  { id: 2, titulo: 'Final da Upper do Circuito Desafiante ocorrerá nessa Segunda-Feira!', categoria: 'CIRCUITO DESAFIANTE', imagem: '/news2.jpg' },
  { id: 3, titulo: 'RED Canids Kalunga lança vídeo divertido mostrando os bastidores da preparação do Academy para a final da Upper no Circuito Desafiante', categoria: 'CIRCUITO DESAFIANTE', imagem: '/news3.jpg' },
  { id: 4, titulo: 'RED Canids Academy enfrenta paiN Gaming Academy valendo vaga na final da Série A da Gamers Club', categoria: 'CS2', imagem: '/news4.jpg' },
  { id: 5, titulo: 'RED Canids vence a atual campeã LOS e surpreende na Etapa 2 do VCB', categoria: 'VALORANT', imagem: '/news5.jpg' },
  { id: 6, titulo: 'Creators se reúnem em evento especial', categoria: 'CREATORS', imagem: '/img/creators.jpg' },
  { id: 7, titulo: 'Watch Party em Pernambuco foi um sucesso!', categoria: 'EXTRAS', imagem: '/img/valorant.jpg' },
];

export default function Noticias() {
  const [filtro, setFiltro] = useState('TUDO');

  const noticiasFiltradas = filtro === 'TUDO'
    ? noticiasExemplo
    : noticiasExemplo.filter(noticia => noticia.categoria === filtro);

  const filtros = ['TUDO', 'LTA SUL', 'CIRCUITO DESAFIANTE', 'CS2', 'VALORANT', 'CREATORS', 'EXTRAS'];

  return (
    <div className="pagina-noticias">
      <h1>Notícias</h1>
      
      <div className="filtros">
        {filtros.map(f => (
          <button
            key={f}
            className={filtro === f ? 'ativo' : ''}
            onClick={() => setFiltro(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="lista-noticias">
        {noticiasFiltradas.map(noticia => (
          <Link key={noticia.id} to={`/noticia/${noticia.id}`} className="card-noticia">
            <img src={noticia.imagem} alt={noticia.titulo} />
            <h3>{noticia.titulo}</h3>
            <p className="categoria">{noticia.categoria}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
