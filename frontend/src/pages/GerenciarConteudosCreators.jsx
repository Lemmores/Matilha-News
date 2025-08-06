import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./GerenciarConteudosCreators.css";

export default function GerenciarConteudosCreators() {
  const [conteudos, setConteudos] = useState([]);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    buscarConteudos(token);
  }, [navigate]);

  const buscarConteudos = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/api/conteudos-creators`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setConteudos(response.data);
    } catch (error) {
      console.error("Erro ao buscar conteúdos dos creators:", error);
    }
  };

  const deletarConteudo = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    if (!window.confirm("Tem certeza que deseja deletar este conteúdo?")) return;

    try {
      await axios.delete(`${API_URL}/api/conteudos-creators/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setConteudos(conteudos.filter((c) => c._id !== id));
    } catch (error) {
      alert("Erro ao deletar conteúdo.");
      console.error("Erro ao deletar conteúdo:", error);
    }
  };

  return (
    <div className="pagina-gerenciar-conteudos">
      <h1>Gerenciar Conteúdos dos Creators</h1>

      {conteudos.length === 0 ? (
        <p>Nenhum conteúdo cadastrado ainda.</p>
      ) : (
        <div className="grid-conteudos">
          {conteudos.map((conteudo) => (
            <div key={conteudo._id} className="card-conteudo">
              <p><strong>Creator:</strong> {conteudo.creator}</p>
              <p><strong>Tipo:</strong> {conteudo.tipo}</p>
              <p>
                <strong>URL:</strong>{" "}
                <a href={conteudo.url} target="_blank" rel="noreferrer">
                  Ver
                </a>
              </p>

              <div className="botoes">
                <Link
                  to={`/editar-conteudo-creator/${conteudo._id}`}
                  className="btn-editar"
                >
                  Editar
                </Link>
                <button
                  onClick={() => deletarConteudo(conteudo._id)}
                  className="btn-deletar"
                >
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
