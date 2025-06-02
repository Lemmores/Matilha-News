import './Noticias.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const noticiasExemplo = [
  { id: 6, imagem: "/news6.jpg", titulo: "RED Canids Kalunga é eliminada pela Vivo Keyd Stars na LTA Sul 2025", categoria: "LTA SUL"},
  { id: 1, titulo: 'RED Canids enfrentará a Vivo Keyd Stars valendo a vida na LTA SUL!', categoria: 'LTA SUL', imagem: '/news1.jpg' },
  { id: 2, imagem: "/news2.jpg", titulo: "RED enfrenta a Vivo Keyd Stars na final da upper", categoria: "CIRCUITO DESAFIANTE" },
  { id: 3, titulo: 'RED Canids Kalunga lança vídeo divertido mostrando os bastidores da preparação do Academy para a final da Upper no Circuito Desafiante', categoria: 'CIRCUITO DESAFIANTE', imagem: '/news3.jpg' },
  { id: 4, titulo: 'RED Canids Academy enfrenta paiN Gaming Academy valendo vaga na final da Série A da Gamers Club', categoria: 'CS2', imagem: '/news4.jpg' },
  { id: 5, imagem: "/news5.jpg", titulo: "RED estreia com vitória pra cima do atual campeão!", categoria: "VALORANT" },
  { id: 7, imagem: "/news7.jpg", titulo: "Campeões do Wild Rift celebram título com a Matilha", categoria: "Wild Rift" },
  { id: 8, imagem: "/news8.jpg", titulo: "Teremos Mudanças", categoria: "LTA SUL" },
]
export default function Noticias() {
  const [filtro, setFiltro] = useState('TUDO');

  const noticiasFiltradas = filtro === 'TUDO'
    ? noticiasExemplo
    : noticiasExemplo.filter(noticia => noticia.categoria === filtro);

  const filtros = ['TUDO', 'LTA SUL', 'CIRCUITO DESAFIANTE', 'CS2', 'VALORANT', 'EXTRAS'];

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
