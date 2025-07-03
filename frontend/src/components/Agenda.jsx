import { useEffect, useState } from "react";
import axios from "axios";
import "./Agenda.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Agenda() {
  const [partidas, setPartidas] = useState([]);

  useEffect(() => {
    const carregarPartidas = async () => {
      try {
        const resposta = await axios.get(`${API_URL}/api/agenda`);
        setPartidas(resposta.data);
      } catch (error) {
        console.error("Erro ao carregar partidas:", error);
      }
    };

    carregarPartidas();
  }, []);

  return (
    <section className="agenda">
      <h2>Agenda de Jogos</h2>
      <div className="jogos">
        {partidas.map((jogo, index) => (
          <div className="jogo-card" key={index}>
            <div className="jogo-info">
              <span className="data-hora">{jogo.data} - {jogo.hora}</span>
              <span className="campeonato">{jogo.campeonato}</span>
              <span className="local">{jogo.local}</span>
            </div>
            <div className="jogo-times">
              <div className="time">
                <img src={jogo.timeA.logo} alt={jogo.timeA.nome} />
                <span>{jogo.timeA.nome}</span>
              </div>
              <span className="versus">vs</span>
              <div className="time">
                <img src={jogo.timeB.logo} alt={jogo.timeB.nome} />
                <span>{jogo.timeB.nome}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
