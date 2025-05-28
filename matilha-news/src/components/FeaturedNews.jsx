import "./FeaturedNews.css";
import { Link } from "react-router-dom";

export default function FeaturedNews() {
  return (
    <section className="featured-news">
      <div className="main-news">
        <Link to="/noticia/1">
          <img src="/news1.jpg" alt="Notícia Principal" />
          <div className="main-news-caption">
            <h3>RED Canids enfrentará a Vivo Keyd Stars valendo a vida!</h3>
          </div>
        </Link>
      </div>
      <div className="side-news">
        <div className="news-card">
          <Link to="/noticia/2">
            <img src="/news2.jpg" alt="Notícia 2" />
            <h3>No último fim de semana, a Matilha esteve presente e torcendo por todo o Brasil!</h3>
          </Link>
        </div>
        <div className="news-card">
          <Link to="/noticia/3">
            <img src="/news3.jpg" alt="Notícia 3" />
            <h3>O Marechal Aegis segue liderando a Matilha rumo ao topo!</h3>
          </Link>
        </div>
      </div>
    </section>
  );
}
