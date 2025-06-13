import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Noticia.css';

export default function NoticiaDetalhada() {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/noticias/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Notícia não encontrada');
        return res.json();
      })
      .then(data => setNoticia(data))
      .catch(err => setErro(err.message));
  }, [id]);

  if (erro) {
    return <main className="noticia"><p>{erro}</p></main>;
  }

  if (!noticia) {
    return <main className="noticia"><p>Carregando...</p></main>;
  }

  return (
    <main className="noticia">
      <h1 className="noticia-titulo">{noticia.titulo}</h1>
      <p className="noticia-data">{noticia.data}</p>
      <img className="noticia-img" src={noticia.imagem} alt={noticia.titulo} />
      
      <div className="noticia-conteudo">
        {noticia.conteudo.map((paragrafo, index) => (
          <p key={index}>{paragrafo}</p>
        ))}
      </div>
      
      <p className="noticia-autor">Por {noticia.autor}</p>
    </main>
  );
}
