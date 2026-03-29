import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Agenda from "../components/Agenda";
import "./ValorantPage.css"; // reutilizando o mesmo CSS

// Line-up Valorant (sem imagens)
const jogadoresValorant = [
  { nome: "tinchoff", twitter: "https://x.com/tinchoffvlr", instagram: "" },
  { nome: "skz", twitter: "https://x.com/skzvlr", instagram: "" },
  { nome: "Lowz", twitter: "https://x.com/Lowzval", instagram: "" },
  { nome: "Urango", twitter: "", instagram: "" },
  { nome: "RgLMeister", twitter: "", instagram: "" },
];

const ValorantPage = () => {
  const [noticiasValorant, setNoticiasValorant] = useState([]);
  const [agendaValorant, setAgendaValorant] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);

  const noticiasPorPagina = 3;
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, agendaRes] = await Promise.all([
          fetch(`${API_URL}/api/noticias`),
          fetch(`${API_URL}/api/agenda`)
        ]);

        const newsData = await newsRes.json();
        const agendaData = await agendaRes.json();

        // Notícias VALORANT
        setNoticiasValorant(
          newsData
            .filter(n => n.categoria === "VALORANT")
            .sort((a, b) => new Date(b.data) - new Date(a.data))
        );

        // Agenda VALORANT
        setAgendaValorant(
          agendaData
            .filter(a => a.campeonato === "VALORANT")
            .sort((a, b) => new Date(a.data) - new Date(b.data))
        );

      } catch (err) {
        console.error("Erro ao carregar Valorant:", err);
      }
    };

    fetchData();
  }, [API_URL]);

  /* ================= PAGINAÇÃO ================= */
  const totalPaginas = Math.ceil(noticiasValorant.length / noticiasPorPagina);
  const inicio = (paginaAtual - 1) * noticiasPorPagina;
  const noticiasExibidas = noticiasValorant.slice(inicio, inicio + noticiasPorPagina);

  const irAnterior = () => paginaAtual > 1 && setPaginaAtual(paginaAtual - 1);
  const irProxima = () => paginaAtual < totalPaginas && setPaginaAtual(paginaAtual + 1);

  /* ================= YOUTUBE EMBED ================= */
  const formatEmbedLink = (url) => {
    if (!url) return "";
    try {
      const id =
        url.includes("watch?v=") ? new URL(url).searchParams.get("v") :
        url.includes("youtu.be/") ? url.split("youtu.be/")[1] :
        url.includes("/live/") ? url.split("/live/")[1] :
        null;

      return id ? `https://www.youtube.com/embed/${id}` : "";
    } catch {
      return "";
    }
  };

  return (
    <div className="pagina-cblol">
      <header className="header-cblol">
        <h1>RED Canids no Valorant</h1>
        <p className="subtitle">VALORANT</p>
      </header>

      {/* ================= LINE-UP ================= */}
      <section className="lineup-section">
        <h2 className="section-title">Line-up Oficial</h2>

        <div className="jogadores-container-horizontal">
          {jogadoresValorant.map((j, idx) => (
            <div key={idx} className="mini-player-card">
              
              {/* PLACEHOLDER SEM FOTO */}
              <div className="mini-image-container" style={{background:"#222", display:"flex", alignItems:"center", justifyContent:"center"}}>
                <span style={{color:"#777", fontSize:"0.9rem"}}>Foto em breve</span>
              </div>

              <div className="mini-player-footer">
                <span className="mini-player-name">{j.nome}</span>
                <span className="mini-player-role">PRO PLAYER</span>

                <div className="social-mobile-only">
                  {j.twitter && (
                    <a href={j.twitter} target="_blank" rel="noopener noreferrer">
                      <img src="/icons/x.png" alt="X" />
                    </a>
                  )}
                  {j.instagram && (
                    <a href={j.instagram} target="_blank" rel="noopener noreferrer">
                      <img src="/icons/instagram.png" alt="Instagram" />
                    </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* ================= VÍDEOS ================= */}
      <section className="videos-section">
        <h2 className="section-title">Últimos Confrontos</h2>

        <div className="video-column">
          {agendaValorant
            .filter(p => p.linkTransmissao)
            .sort((a, b) => new Date(b.data) - new Date(a.data))
            .slice(0, 2)
            .map((p, idx) => (
              <div key={idx} className="video-container-box">
                <iframe
                  src={formatEmbedLink(p.linkTransmissao)}
                  title={`Valorant Match ${idx}`}
                  allowFullScreen
                ></iframe>
              </div>
            ))}
        </div>
      </section>

      {/* ================= NOTÍCIAS ================= */}
      <section className="news-section">
        <h2 className="section-title">Notícias Relacionadas</h2>

        <div className="noticia-list">
          {noticiasExibidas.map(n => (
            <Link key={n._id} to={`/noticia/${n._id}`} className="card-noticia">
              <img src={n.imagem} alt={n.titulo} />
              <p className="categoria">{n.categoria}</p>
              <h3>{n.titulo}</h3>
              <p className="conteudo">{n.conteudo}</p>
            </Link>
          ))}
        </div>

        {totalPaginas > 1 && (
          <div className="paginacao-noticias">
            <button onClick={irAnterior} disabled={paginaAtual === 1}>Anterior</button>
            <span className="page-indicator">{paginaAtual} / {totalPaginas}</span>
            <button onClick={irProxima} disabled={paginaAtual === totalPaginas}>Próxima</button>
          </div>
        )}
      </section>

      {/* ================= AGENDA ================= */}
      <section className="agenda-section">
        <Agenda partidas={agendaValorant} />
      </section>
    </div>
  );
};

export default ValorantPage;
