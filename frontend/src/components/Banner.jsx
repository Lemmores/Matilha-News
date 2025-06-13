import React from "react";
import "./Banner.css";

export default function Banner() {
  return (
    <section className="banner">
      <div className="banner-overlay">
        <div className="banner-content">
          <h1>A força da Matilha!</h1>
          <p>Acompanhe todas as novidades da RED Canids Kalunga</p>
          <button onClick={() => window.scrollTo({ top: 500, behavior: "smooth" })}>
            Ver notícias
          </button>
        </div>
      </div>
    </section>
  );
}
