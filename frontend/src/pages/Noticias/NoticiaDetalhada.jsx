import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Noticia.css";

export default function NoticiaDetalhada() {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);

  useEffect(() => {
    const fetchNoticia = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/noticias/${id}`);
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

  // Função para converter link do YouTube em link embed
  const getYoutubeEmbedUrl = (url) => {
    if (!url) return null;

    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
    const match = url.match(regex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const embedUrl = getYoutubeEmbedUrl(noticia.videoUrl);

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

      <img
        className="noticia-img"
        src={`http://localhost:5000${noticia.imagem}`}
        alt={noticia.titulo}
      />

      <div className="noticia-conteudo">
        {Array.isArray(noticia.textoCompleto)
          ? noticia.textoCompleto.map((paragrafo, index) => (
              <p key={index}>{paragrafo}</p>
            ))
          : <p>{noticia.textoCompleto}</p>}
      </div>

      {/* Vídeo do YouTube */}
      {embedUrl && (
        <div className="noticia-video">
          <iframe
            width="100%"
            height="400"
            src={embedUrl}
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