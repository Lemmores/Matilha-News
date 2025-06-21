import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./GerenciarWatchParties.css";

export default function GerenciarWatchParties() {
  const [watchParties, setWatchParties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    axios
      .get("http://localhost:5000/api/watchparties")
      .then((res) => setWatchParties(res.data))
      .catch((err) => console.error(err));
  }, [navigate]);

  const deletarWatchParty = async (id) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Tem certeza que deseja deletar essa Watch Party?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/watchparties/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWatchParties(watchParties.filter((wp) => wp._id !== id));
    } catch (err) {
      alert("Erro ao deletar a Watch Party.");
      console.error(err);
    }
  };

  return (
    <div className="pagina-painel">
      <h1>Gerenciar Watch Parties</h1>

      <div className="lista-watchparties-admin">
        {watchParties.map((evento) => (
          <div key={evento._id} className="card-watchparty-admin">
            <img
              src={`http://localhost:5000${evento.imagem}`}
              alt={evento.titulo}
            />
            <h3>{evento.titulo}</h3>
            <p className="watchparty-info">{evento.data} - {evento.local}</p>
            <div className="botoes-acoes">
              <button className="botao-editar" onClick={() => navigate(`/editar-watchparty/${evento._id}`)}>Editar</button>
              <button className="botao-deletar" onClick={() => deletarWatchParty(evento._id)}>Deletar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
