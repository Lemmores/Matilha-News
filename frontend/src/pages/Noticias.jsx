import './Noticias.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [filtro, setFiltro] = useState('TUDO');

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetch(`${API_URL}/api/noticias`)
      .then(res => res.json())
      .then(data => {
        // Ordena por data (mais recentes primeiro)
        const ordenadas = data.sort((a, b) => new Date(b.data) - new Date(a.data));
        setNoticias(ordenadas);
      })
      .catch(err => console.error('Erro ao carregar notícias:', err));
  }, [API_URL]);

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
          <Link
            key={noticia._id}
            to={`/noticia/${noticia._id}`}
            className="card-noticia"
          >
            <img
              src={noticia.imagem} // ✅ REMOVIDO o prefixo API_URL
              alt={noticia.titulo}
            />
            <p className="categoria">{noticia.categoria}</p>
            <h3>{noticia.titulo}</h3>
            <p className="conteudo">{noticia.conteudo}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
