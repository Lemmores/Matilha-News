import React, { useState, useEffect } from "react";
import "./FeaturedNews.css";
import { Link } from "react-router-dom";

// Importações do Swiper
import "swiper/css";

export default function FeaturedNews() {
  const mainNews = { id: 7, img: "/news7.jpg", title: "RED Canids Kalunga vence a VKS e está na final do Circuito Desafiante!", tag: "CIRCUITO DESAFIANTE" };

  const sideNews = [
    { id: 11, img: "/news11.jpg", title: "RED Canids anuncia reforços para o CS2! ", tag: "CS2" },
    { id: 8, img: "/news8.jpg", title: "Donos da RED prometem reformulação após queda na LTA SUL", tag: "LTA SUL" },
    { id: 10, img: "/news10.jpg", title: "RED vence TBK por 2 a 1 e segue invicta no Challengers Brazil 2025", tag: "VALORANT" },
    { id: 3, img: "/news3.jpg", title: "RED lança vídeo dos bastidores do Academy", tag: "CIRCUITO DESAFIANTE" },
    { id: 4, img: "/news4.jpg", title: "Red Academy enfrenta Pain Academy na final da Série A da Gamers Club", tag: "CS2" },
    { id: 6, img: "/news6.jpg", title: "RED Canids Kalunga é eliminada pela Vivo Keyd Stars na LTA Sul 2025", tag: "LTA SUL" },
  ];

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="featured-news">
      <div className="featured-news-layout">
        {/* Desktop: Notícia principal */}
        {!isMobile && (
          <div className="main-news">
            <Link to={`/noticia/${mainNews.id}`}>
              <img src={mainNews.img} alt="Notícia Principal" />
              <span className="news-tag">{mainNews.tag}</span> {/* TAG fora da legenda */}
              <div className="main-news-caption">
                <h3>{mainNews.title}</h3>
              </div>
            </Link>
          </div>
        )}

        {/* Desktop: Grid de notícias laterais */}
        {!isMobile ? (
          <div className="side-news-grid">
            {sideNews.map(({ id, img, title, tag }) => (
              <div key={id} className="news-card">
                <Link to={`/noticia/${id}`}>
                  <img src={img} alt={`Notícia ${id}`} />
                  <span className="news-tag">{tag}</span>
                  <div className="news-caption">
                    <h3>{title}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          // Mobile: Todas as notícias empilhadas (inclusive a principal)
          <div className="side-news-list">
            {[mainNews, ...sideNews].map(({ id, img, title, tag }) => (
              <div key={id} className="news-card">
                <Link to={`/noticia/${id}`}>
                  <img src={img} alt={`Notícia ${id}`} />
                  <div className="news-caption">
                    <span className="news-tag">{tag}</span>
                    <h3>{title}</h3>
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
