import './Noticias.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [filtro, setFiltro] = useState('TUDO');

  useEffect(() => {
    fetch('http://localhost:3001/api/noticias') // ajuste a URL se for necessário
      .then(res => res.json())
      .then(data => setNoticias(data))
      .catch(err => console.error('Erro ao carregar notícias:', err));
  }, []);

  const filtros = ['TUDO', 'LTA SUL', 'CIRCUITO DESAFIANTE', 'CS2', 'VALORANT', 'EXTRAS'];

  const noticiasFiltradas = filtro === 'TUDO'
    ? noticias
    : noticias.filter(n => n.categoria === filtro);

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
