import React, { useState, useEffect } from "react";
import "./FeaturedNews.css";
import { Link } from "react-router-dom";
import "swiper/css";

export default function FeaturedNews() {
  const [noticias, setNoticias] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/noticias");
        const data = await response.json();
        setNoticias(data.reverse()); // mostra mais recentes primeiro
      } catch (error) {
        console.error("Erro ao carregar notícias:", error);
      }
    };

    fetchNoticias();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (noticias.length === 0) {
    return <p style={{ color: "white", textAlign: "center" }}>Carregando notícias...</p>;
  }

  const mainNews = noticias[0];
  const sideNews = noticias.slice(1, 7); // até 5 laterais

  return (
    <section className="featured-news">
      <div className="featured-news-layout">
        {!isMobile && (
          <div className="main-news">
            <Link to={`/noticia/${mainNews._id}`}>
              <img src={`http://localhost:5000${mainNews.imagem}`} alt="Notícia Principal" />
              <span className="news-tag">{mainNews.categoria || "NOTÍCIA"}</span>
              <div className="main-news-caption">
                <h3>{mainNews.titulo}</h3>
              </div>
            </Link>
          </div>
        )}

        {!isMobile ? (
          <div className="side-news-grid">
            {sideNews.map(({ _id, imagem, titulo, categoria }) => (
              <div key={_id} className="news-card">
                <Link to={`/noticia/${_id}`}>
                  <img src={`http://localhost:5000${imagem}`} alt={`Notícia`} />
                  <span className="news-tag">{categoria || "NOTÍCIA"}</span>
                  <div className="news-caption">
                    <h3>{titulo}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="side-news-list">
            {[mainNews, ...sideNews].map(({ _id, imagem, titulo, categoria }) => (
              <div key={_id} className="news-card">
                <Link to={`/noticia/${_id}`}>
                  <img src={`http://localhost:5000${imagem}`} alt={`Notícia`} />
                  <div className="news-caption">
                    <span className="news-tag">{categoria || "NOTÍCIA"}</span>
                    <h3>{titulo}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}