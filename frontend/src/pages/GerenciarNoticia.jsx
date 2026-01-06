import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./GerenciarNoticia.css";

export default function GerenciarNoticia() {
  const [noticias, setNoticias] = useState([]);
  const [filtro, setFiltro] = useState("TUDO");
  const navigate = useNavigate();

  const categorias = ["TUDO", "CBLOL", "LTA SUL", "CIRCUITO DESAFIANTE", "CS2", "VALORANT", "FREEFIRE", "EXTRAS"];
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    const buscarNoticias = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/noticias`);
        
        // ORDENAÇÃO: Garante que a data mais recente (maior timestamp) venha primeiro
        const ordenadas = res.data.sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

        setNoticias(ordenadas);
      } catch (err) {
        console.error("Erro ao carregar notícias:", err);
      }
    };

    buscarNoticias();
  }, [navigate, API_URL]);

  const deletarNoticia = async (id) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Tem certeza que deseja deletar essa notícia?")) return;

    try {
      await axios.delete(`${API_URL}/api/noticias/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Remove da lista mantendo a ordem atual
      setNoticias((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      alert("Erro ao deletar a notícia.");
      console.error(err);
    }
  };

  // Filtra as notícias mantendo a ordenação que já foi feita no useEffect
  const noticiasFiltradas = filtro === "TUDO"
    ? noticias
    : noticias.filter((n) => n.categoria === filtro);

  return (
    <div className="pagina-painel">
      <h1>Gerenciar Notícias</h1>

      <div className="filtros">
        {categorias.map((cat) => (
          <button
            key={cat}
            className={filtro === cat ? "ativo" : ""}
            onClick={() => setFiltro(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="lista-noticias-admin">
        {noticiasFiltradas.length > 0 ? (
          noticiasFiltradas.map((noticia) => (
            <div key={noticia._id} className="card-noticia-admin">
              <div className="container-imagem">
                <img
                  src={noticia.imagem}
                  alt={noticia.titulo}
                />
              </div>
              <div className="info-noticia">
                <h3>{noticia.titulo}</h3>
                {/* Opcional: Exibir a data para conferência */}
                <small>{new Date(noticia.createdAt).toLocaleDateString('pt-BR')}</small>
              </div>
              <div className="botoes-acoes">
                <button
                  className="botao-editar"
                  onClick={() => navigate(`/editar-noticia/${noticia._id}`)}
                >
                  Editar
                </button>
                <button
                  className="botao-deletar"
                  onClick={() => deletarNoticia(noticia._id)}
                >
                  Deletar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="aviso-vazio">Nenhuma notícia encontrada para "{filtro}".</p>
        )}
      </div>
    </div>
  );
}