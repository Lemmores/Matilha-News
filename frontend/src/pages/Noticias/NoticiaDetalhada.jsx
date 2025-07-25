import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Noticia.css";

export default function NoticiaDetalhada() {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchNoticia = async () => {
      try {
        const response = await fetch(`${API_URL}/api/noticias/${id}`);
        const data = await response.json();
        setNoticia(data);
      } catch (error) {
        console.error("Erro ao carregar notícia:", error);
      }
    };

    fetchNoticia();
  }, [id]);

  if (!noticia) {
    return <p style={{ color: "white", textAlign: "center" }}>Carregando notícia...</p>;
  }

  return (
    <main className="noticia">
      <h1 className="noticia-titulo">{noticia.titulo}</h1>
      <p className="noticia-data">
        {new Date(noticia.data).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </p>

      {noticia.imagem && (
        <img
          className="noticia-img"
          src={noticia.imagem}
          alt={noticia.titulo}
        />
      )}

      <div className="noticia-conteudo">
        {Array.isArray(noticia.textoCompleto)
          ? noticia.textoCompleto.map((paragrafo, index) => (
              <p key={index}>{paragrafo}</p>
            ))
          : <p>{noticia.textoCompleto}</p>}
      </div>

      {noticia.videoUrl && (
        <div className="noticia-video">
          <iframe
            width="100%"
            height="400"
            src={noticia.videoUrl}
            title="Vídeo relacionado à notícia"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {noticia.autor && <p className="noticia-autor">Por {noticia.autor}</p>}
    </main>
  );
}
