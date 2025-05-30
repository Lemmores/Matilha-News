import "./FeaturedNews.css";
import { Link } from "react-router-dom";

export default function FeaturedNews() {
  return (
    <section className="featured-news">
      <div className="main-news">
        <Link to="/noticia/1">
          <img src="/news1.jpg" alt="Notícia Principal" />
          <div className="main-news-caption">
            <h3>RED Canids enfrentará a Vivo Keyd Stars valendo a vida na LTA SUL!</h3>
          </div>
        </Link>
      </div>
      <div className="side-news">
        <div className="news-card">
          <Link to="/noticia/4">
            <img src="/news4.jpg" alt="Notícia 4" />
            <h3>RED Canids Academy enfrenta paiN Gaming Academy valendo vaga na final da Série A da Gamers Club</h3>
          </Link>
        </div>
        <div className="news-card">
          <Link to="/noticia/3">
            <img src="/news3.jpg" alt="Notícia 3" />
            <h3>RED Canids Kalunga lança vídeo divertido mostrando os bastidores da preparação do Academy para a final da Upper no Circuito Desafiante</h3>
          </Link>
        </div>
      </div>
    </section>
  );
}
