import React from "react";
import "./NewsCard.css";

export default function NewsCard({ news }) {
  return (
    <div className="news-card">
      <img src={news.image} alt={news.title} className="news-image" />
      <div className="news-content">
        <h3>{news.title}</h3>
        <p>{news.description}</p>
      </div>
    </div>
  );
}
