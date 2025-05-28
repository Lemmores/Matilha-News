import React from "react";
import "./NewsCarousel.css";

const newsData = [
  {
    title: "RED Canids vence clássico no CBLOL",
    image: "https://via.placeholder.com/600x300",
    description: "A matilha garante mais uma vitória na temporada.",
  },
  {
    title: "Novo uniforme 2025 revelado",
    image: "https://via.placeholder.com/600x300",
    description: "Design ousado e moderno empolga os torcedores.",
  },
  {
    title: "RED Canids anuncia nova line-up Academy",
    image: "https://via.placeholder.com/600x300",
    description: "A base vem forte com jovens promessas.",
  },
];

export default function NewsCarousel() {
  return (
    <div className="carousel">
      {newsData.map((news, index) => (
        <div className="carousel-item" key={index}>
          <img src={news.image} alt={news.title} />
          <div className="carousel-content">
            <h2>{news.title}</h2>
            <p>{news.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
