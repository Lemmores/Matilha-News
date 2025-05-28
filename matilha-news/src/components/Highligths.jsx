// src/components/TopNews.jsx
import "./TopNews.css";

export default function TopNews() {
  return (
    <section className="top-news">
      <div className="main-news">
        <img src="/img/noticia-destaque.jpg" alt="Notícia principal" />
        <div className="main-news-text">
          <h2>Título da notícia principal</h2>
          <p>Resumo curto da notícia mais importante do momento.</p>
        </div>
      </div>
      <div className="side-news">
        <div className="mini-news">
          <img src="/img/noticia1.jpg" alt="Notícia 1" />
          <p>Título notícia 1</p>
        </div>
        <div className="mini-news">
          <img src="/img/noticia2.jpg" alt="Notícia 2" />
          <p>Título notícia 2</p>
        </div>
      </div>
    </section>
  );
}
