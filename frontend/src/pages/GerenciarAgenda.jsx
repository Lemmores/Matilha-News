import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./GerenciarAgenda.css";

export default function GerenciarAgenda() {
  const [agenda, setAgenda] = useState([]);
  const [filtro, setFiltro] = useState("TUDO");
  const navigate = useNavigate();

  const campeonatos = ["TUDO", "LTA SUL", "CIRCUITO DESAFIANTE", "CS2", "VALORANT"];
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    axios
      .get(`${API_URL}/api/agenda`)
      .then((res) => setAgenda(res.data))
      .catch((err) => console.error(err));
  }, [navigate, API_URL]);

  const deletarPartida = async (id) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Tem certeza que deseja deletar essa partida?")) return;

    try {
      await axios.delete(`${API_URL}/api/agenda/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAgenda(agenda.filter((p) => p._id !== id));
    } catch (err) {
      alert("Erro ao deletar a partida.");
      console.error(err);
    }
  };

  const partidasFiltradas =
    filtro === "TUDO" ? agenda : agenda.filter((p) => p.campeonato === filtro);

  return (
    <div className="pagina-painel">
      <h1>Gerenciar Agenda</h1>

      <div className="filtros">
        {campeonatos.map((camp) => (
          <button
            key={camp}
            className={filtro === camp ? "ativo" : ""}
            onClick={() => setFiltro(camp)}
          >
            {camp}
          </button>
        ))}
      </div>

      <div className="lista-agenda-admin">
        {partidasFiltradas.map((partida) => (
          <div key={partida._id} className="card-partida-admin">
            <div className="info-principal">
              <p><strong>{partida.data}</strong> - {partida.hora}</p>
              <p className="campeonato">{partida.campeonato}</p>
              {partida.local && <p className="local">{partida.local}</p>}
            </div>

            <div className="times">
              <div className="time">
                <img src={partida.timeA.logo} alt={partida.timeA.nome} />
                <span>{partida.timeA.nome}</span>
              </div>
              <span className="versus">vs</span>
              <div className="time">
                <img src={partida.timeB.logo} alt={partida.timeB.nome} />
                <span>{partida.timeB.nome}</span>
              </div>
            </div>

            <div className="botoes-acoes">
              <button
                className="botao-editar"
                onClick={() => navigate(`/editar-agenda/${partida._id}`)}
              >
                Editar
              </button>
              <button
                className="botao-deletar"
                onClick={() => deletarPartida(partida._id)}
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
