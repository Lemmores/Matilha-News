import React, { useState, useEffect } from "react";
import "./FeaturedNews.css";
import { Link } from "react-router-dom";
import "swiper/css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function FeaturedNews() {
  const [noticias, setNoticias] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await fetch(`${API_URL}/api/noticias`);
        const data = await response.json();

        // Ordena por data (mais recentes primeiro)
        const ordenadasPorData = data.sort((a, b) => new Date(b.data) - new Date(a.data));

        setNoticias(ordenadasPorData);
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
  const sideNews = noticias.slice(1, 10); 

  return (
    <section className="featured-news">
      <div className="featured-news-layout">
        {!isMobile && (
          <div className="main-news">
            <Link to={`/noticia/${mainNews._id}`}>
              <img src={mainNews.imagem} alt="Notícia Principal" />
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
                  <img src={imagem} alt="Notícia" />
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
                  <img src={imagem} alt="Notícia" />
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
