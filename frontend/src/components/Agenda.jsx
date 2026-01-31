import { useEffect, useState } from "react";
import axios from "axios";
import "./Agenda.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Agenda({ partidas }) {
  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    const carregar = async () => {
      try {
        const dados = partidas
          ? partidas
          : (await axios.get(`${API_URL}/api/agenda`)).data;

        const jogosFiltrados = filtrarProximos20Dias(dados);
        setJogos(jogosFiltrados);
      } catch (err) {
        console.error("Erro ao carregar partidas:", err);
      }
    };

    carregar();
  }, [partidas]);

  /* ======================
      FILTRO + ORDENAÇÃO
     ====================== */
  function filtrarProximos20Dias(lista) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const dataLimite = new Date();
  dataLimite.setDate(hoje.getDate() + 20);

  return lista
    .filter((jogo) => {
      const dataJogo = new Date(jogo.data);
      dataJogo.setHours(12, 0, 0, 0);
      return dataJogo >= hoje && dataJogo <= dataLimite;
    })
    .sort((a, b) => {
      const dataA = new Date(a.data);
      const dataB = new Date(b.data);

      dataA.setHours(12, 0, 0, 0);
      dataB.setHours(12, 0, 0, 0);

      if (a.hora) {
        const [hA, mA] = a.hora.split(":").map(Number);
        dataA.setHours(hA, mA);
      }

      if (b.hora) {
        const [hB, mB] = b.hora.split(":").map(Number);
        dataB.setHours(hB, mB);
      }

      return dataA - dataB;
    });
}


  /* ======================
      FORMATA DATA
     ====================== */
  const formatarData = (data) =>
  new Date(data).toLocaleDateString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });


  return (
    <section className="agenda">
      <h2>Agenda de Jogos</h2>

      <div className="jogos">
        {jogos.length === 0 && (
          <p>Sem partidas nos próximos 20 dias.</p>
        )}

        {jogos.map((jogo) => {
          const timeA_nome = jogo?.timeA?.nome || "Time A";
          const timeA_logo =
            jogo?.timeA?.logo ||
            "https://res.cloudinary.com/matilha-news/image/upload/v1719856619/matilha-news/default.png";

          const timeB_nome = jogo?.timeB?.nome || "Time B";
          const timeB_logo =
            jogo?.timeB?.logo ||
            "https://res.cloudinary.com/matilha-news/image/upload/v1719856619/matilha-news/default.png";

          const cardContent = (
            <div className="jogo-card">
              <div className="jogo-info">
                <span className="data-hora">
                  {formatarData(jogo.data)}
                  {jogo.hora && ` - ${jogo.hora}`}
                </span>

                <span className="campeonato">{jogo.campeonato}</span>

                {jogo.local && (
                  <span className="local">{jogo.local}</span>
                )}
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

          return jogo.linkTransmissao ? (
            <a
              key={jogo._id}
              href={jogo.linkTransmissao}
              target="_blank"
              rel="noopener noreferrer"
              className="jogo-link"
            >
              {cardContent}
            </a>
          ) : (
            <div key={jogo._id}>{cardContent}</div>
          );
        })}
      </div>
    </section>
  );
}
