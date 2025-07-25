import { useEffect, useState } from "react";
import axios from "axios";
import "./Agenda.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Agenda({ partidas }) {
  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    const carregar = async () => {
      if (!partidas) {
        try {
          const resposta = await axios.get(`${API_URL}/api/agenda`);
          const jogosFiltrados = filtrarProximos15Dias(resposta.data);
          setJogos(jogosFiltrados);
        } catch (err) {
          console.error("Erro ao carregar partidas:", err);
        }
      } else {
        const jogosFiltrados = filtrarProximos15Dias(partidas);
        setJogos(jogosFiltrados);
      }
    };
    carregar();
  }, [partidas]);

    function filtrarProximos15Dias(lista) {
    const ontem = new Date();
    ontem.setDate(ontem.getDate() - 1);
    const dataLimite = new Date();
    dataLimite.setDate(ontem.getDate() + 15);
    
    return lista.filter((jogo) => {
      const [dia, mes, ano] = jogo.data.split("/").map(Number);
      const dataJogo = new Date(ano, mes - 1, dia);
      return dataJogo >= ontem && dataJogo <= dataLimite;
    });
  }


  return (
    <section className="agenda">
      <h2>Agenda de Jogos</h2>
      <div className="jogos">
        {jogos.length === 0 && <p>Sem partidas nos próximos 15 dias.</p>}
        {jogos.map((jogo, index) => {
          const timeA_nome = jogo?.timeA?.nome || "Time A";
          const timeA_logo = jogo?.timeA?.logo || "https://res.cloudinary.com/matilha-news/image/upload/v1719856619/matilha-news/default.png";

          const timeB_nome = jogo?.timeB?.nome || "Time B";
          const timeB_logo = jogo?.timeB?.logo || "https://res.cloudinary.com/matilha-news/image/upload/v1719856619/matilha-news/default.png";

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
