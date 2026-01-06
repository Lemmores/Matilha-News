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
        
        // Cópia do array para garantir a re-renderização
        const dados = [...res.data];

        // ORDENAÇÃO CORRIGIDA: Usando o campo 'data' que aparece no seu banco
        dados.sort((a, b) => {
          const dataB = new Date(b.data).getTime();
          const dataA = new Date(a.data).getTime();
          return dataB - dataA; // Mais recente primeiro
        });

        setNoticias(dados);
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
      setNoticias((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      alert("Erro ao deletar a notícia.");
      console.error(err);
    }
  };

  // Filtra mantendo a ordem já estabelecida
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
                <img src={noticia.imagem} alt={noticia.titulo} />
              </div>
              <div className="info-noticia">
                <h3>{noticia.titulo}</h3>
                {/* Exibe a data formatada para você conferir a ordem */}
                <span className="data-noticia">
                  {new Date(noticia.data).toLocaleDateString('pt-BR')}
                </span>
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
          <p className="aviso-vazio">Nenhuma notícia encontrada.</p>
        )}
      </div>
    </div>
  );
}