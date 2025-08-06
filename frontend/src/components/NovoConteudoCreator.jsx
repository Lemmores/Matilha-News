import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./NovoConteudoCreator.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const creatorsNomes = [
  "MEDU",
  "ISMALAKOI",
  "PEU",
  "DYEN",
  "IASSER",
  "AMMY",
  "ISAC",
  "JOÃO DIAS",
];

export default function NovoConteudoCreator() {
  const [creator, setCreator] = useState("");
  const [tipo, setTipo] = useState("tiktok");
  const [url, setUrl] = useState("");
  const [conteudos, setConteudos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    fetchConteudos(token);
  }, [navigate]);

  const fetchConteudos = async (token) => {
    try {
      const res = await axios.get(`${API_URL}/api/conteudos-creators`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setConteudos(res.data);
    } catch (err) {
      console.error("Erro ao buscar conteúdos:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!creator || !tipo || !url) {
      alert("Preencha todos os campos");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você precisa estar logado para adicionar conteúdo.");
      navigate("/login");
      return;
    }

    const novoConteudo = { creator, tipo, url };

    try {
      if (editandoId) {
        await axios.put(`${API_URL}/api/conteudos-creators/${editandoId}`, novoConteudo, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setConteudos((prev) =>
          prev.map((c) => (c._id === editandoId ? { ...c, ...novoConteudo } : c))
        );
        setEditandoId(null);
      } else {
        const res = await axios.post(`${API_URL}/api/conteudos-creators`, novoConteudo, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setConteudos((prev) => [...prev, res.data]);
      }

      setCreator("");
      setTipo("tiktok");
      setUrl("");
    } catch (err) {
      console.error("Erro ao salvar conteúdo:", err);
      alert("Erro ao salvar conteúdo");
    }
  };

  const handleEditar = (conteudo) => {
    setCreator(conteudo.creator);
    setTipo(conteudo.tipo);
    setUrl(conteudo.url);
    setEditandoId(conteudo._id);
  };

  const handleDeletar = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você precisa estar logado para deletar conteúdo.");
      navigate("/login");
      return;
    }

    if (!window.confirm("Tem certeza que deseja deletar?")) return;

    try {
      await axios.delete(`${API_URL}/api/conteudos-creators/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setConteudos((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Erro ao deletar conteúdo:", err);
      alert("Erro ao deletar conteúdo");
    }
  };

  return (
    <div className="novo-conteudo-creator">
      <h2>{editandoId ? "Editar Conteúdo" : "Novo Conteúdo de Creator"}</h2>

      <form onSubmit={handleSubmit} className="formulario-creator">
        <label>
          Creator:
          <select value={creator} onChange={(e) => setCreator(e.target.value)} required>
            <option value="">Selecione</option>
            {creatorsNomes.map((nome) => (
              <option key={nome} value={nome}>
                {nome}
              </option>
            ))}
          </select>
        </label>

        <label>
          Tipo:
          <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
            <option value="tiktok">TikTok</option>
            <option value="reel">Instagram Reel</option>
          </select>
        </label>

        <label>
          URL:
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
            required
          />
        </label>

        <button type="submit">{editandoId ? "Salvar Edição" : "Adicionar Conteúdo"}</button>
      </form>

      <hr />

      <h3>Conteúdos Cadastrados</h3>
      {conteudos.length === 0 ? (
        <p>Nenhum conteúdo cadastrado ainda.</p>
      ) : (
        <ul className="lista-conteudos">
          {conteudos.map((c) => (
            <li key={c._id}>
              <strong>{c.creator}</strong> — {c.tipo} <br />
              <small>{c.url}</small>
              <div className="botoes-acoes">
                <button onClick={() => handleEditar(c)}>Editar</button>
                <button onClick={() => handleDeletar(c._id)}>Deletar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
