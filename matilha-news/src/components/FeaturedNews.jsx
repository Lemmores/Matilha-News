import React, { useState, useEffect } from "react";
import "./FeaturedNews.css";
import { Link } from "react-router-dom";

// Importações do Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function FeaturedNews() {
  const mainNews = {
   id: 2, img: "/news2.jpg", title: "RED enfrenta a Vivo Keyd Stars na final da upper", tag: "CIRCUITO DESAFIANTE"
  };

  const sideNews = [
     { id: 6, img: "/news6.jpg", title: "RED Canids Kalunga é eliminada pela Vivo Keyd Stars na LTA Sul 2025", tag: "LTA SUL" },
    { id: 3, img: "/news3.jpg", title: "RED lança vídeo dos bastidores do Academy", tag: "CIRCUITO DESAFIANTE" },
    { id: 4, img: "/news4.jpg", title: "Red Academy enfrenta Pain Academy na final da Série A da Gamers Club", tag: "CS2" },
    { id: 5, img: "/news5.jpg", title: "RED estreia com vitória pra cima do atual campeão!", tag: "VALORANT" },
    { id: 7, img: "/news7.jpg", title: "Campeões do Wild Rift celebram título com a Matilha", tag: "Wild Rift" },
    { id: 8, img: "/news8.jpg", title: "Teremos Mudanças", tag: "LTA SUL" },
  
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
