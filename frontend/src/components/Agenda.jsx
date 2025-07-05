import { useEffect, useState } from "react";
import axios from "axios";
import "./Agenda.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Agenda({ partidas }) {
  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    if (!partidas) {
      const carregarPartidas = async () => {
        try {
          const resposta = await axios.get(`${API_URL}/api/agenda`);
          const jogosFiltrados = filtrarProximos30Dias(resposta.data);
          setJogos(jogosFiltrados);
        } catch (error) {
          console.error("Erro ao carregar partidas:", error);
        }
      };
      carregarPartidas();
    } else {
      const jogosFiltrados = filtrarProximos30Dias(partidas);
      setJogos(jogosFiltrados);
    }
  }, [partidas]);

  function filtrarProximos30Dias(lista) {
    const hoje = new Date();
    const dataLimite = new Date();
    dataLimite.setDate(hoje.getDate() + 30);

    return lista.filter(jogo => {
      const [dia, mes, ano] = jogo.data.split("/").map(Number);
      const dataJogo = new Date(ano, mes - 1, dia);
      return dataJogo >= hoje && dataJogo <= dataLimite;
    });
  }

  // Utilitário para lidar com URLs de logo
  const tratarLogo = (logo) => {
    if (!logo) return "/logos/default.png";
    return logo.startsWith("http") ? logo : `${API_URL}${logo}`;
  };

  return (
    <section className="agenda">
      <h2>Agenda de Jogos</h2>
      <div className="jogos">
        {jogos.length === 0 && <p>Sem partidas nos próximos 30 dias.</p>}
        {jogos.map((jogo, index) => {
          const timeA_nome = jogo?.timeA?.nome || "RED Canids";
          const timeA_logo = tratarLogo(jogo?.timeA?.logo || "/logos/red-logo.png");

          const timeB_nome = jogo?.timeB?.nome || "Adversário";
          const timeB_logo = tratarLogo(jogo?.timeB?.logo);

          console.log("LOGO DO TIME B:", timeB_logo);

          return (
            <div className="jogo-card" key={index}>
              <div className="jogo-info">
                <span className="data-hora">{jogo.data} - {jogo.hora}</span>
                <span className="campeonato">{jogo.campeonato}</span>
                {jogo.local && <span className="local">{jogo.local}</span>}
              </div>
              <div className="jogo-times">
                <div className="time">
                  <img src={timeA_logo} alt={timeA_nome} />
                  <span>{timeA_nome}</span>
                </div>
                <span className="versus">vs</span>
                <div className="time">
                  <img src={timeB_logo} alt={timeB_nome} />
                  <span>{timeB_nome}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
