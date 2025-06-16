import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PainelAdmin.css";

export default function PainelAdmin() {
  const [noticias, setNoticias] = useState([]);
  const [filtro, setFiltro] = useState("TUDO");
  const navigate = useNavigate();

  const categorias = ["TUDO", "LTA SUL", "CIRCUITO DESAFIANTE", "CS2", "VALORANT", "EXTRAS"];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    axios
      .get("http://localhost:5000/api/noticias")
      .then((res) => setNoticias(res.data))
      .catch((err) => console.error(err));
  }, [navigate]);

  const deletarNoticia = async (id) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Tem certeza que deseja deletar essa notícia?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/noticias/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNoticias(noticias.filter((n) => n._id !== id));
    } catch (err) {
      alert("Erro ao deletar a notícia.");
      console.error(err);
    }
  };

  const noticiasFiltradas =
    filtro === "TUDO" ? noticias : noticias.filter((n) => n.categoria === filtro);

  return (
    <div className="pagina-painel">
      <h1>Painel Administrativo</h1>


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
        {noticiasFiltradas.map((noticia) => (
          <div key={noticia._id} className="card-noticia-admin">
            <img
              src={`http://localhost:5000${noticia.imagem}`}
              alt={noticia.titulo}
            />
            <h3>{noticia.titulo}</h3>
            <p className="categoria">{noticia.categoria}</p>
            <button onClick={() => deletarNoticia(noticia._id)}>Deletar</button>
          </div>
        ))}
      </div>
    </div>
  );
}
