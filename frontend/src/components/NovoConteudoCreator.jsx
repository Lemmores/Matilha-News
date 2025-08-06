import React, { useState } from "react";
import "./NovoConteudoCreator.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const NovoConteudoCreator = () => {
  const [formData, setFormData] = useState({
    creator: "",
    tipo: "",
    url: "",
  });

  const [mensagem, setMensagem] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      setMensagem("Você precisa estar logado para cadastrar conteúdo.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/conteudos-creators`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMensagem("Conteúdo enviado com sucesso!");
        setFormData({ creator: "", tipo: "", url: "" });
      } else {
        const err = await response.json();
        setMensagem(err.error || "Erro ao enviar conteúdo.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar conteúdo:", error);
      setMensagem("Erro de conexão.");
    }
  };

  return (
    <div className="novo-conteudo-creator-container">
      <h2>Adicionar Conteúdo de Creator</h2>
      <form onSubmit={handleSubmit} className="novo-conteudo-creator-form">
        <input
          type="text"
          name="creator"
          placeholder="Nome do Creator"
          value={formData.creator}
          onChange={handleChange}
          required
        />

        <select
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
          required
        >
          <option value="">Selecione o tipo de conteúdo</option>
          <option value="Reels">Reels</option>
          <option value="TikTok">TikTok</option>
          <option value="Shorts">Shorts</option>
          <option value="Outro">Outro</option>
        </select>

        <input
          type="text"
          name="url"
          placeholder="URL do conteúdo (Reels, TikTok etc)"
          value={formData.url}
          onChange={handleChange}
          required
        />

        <button type="submit">Cadastrar Conteúdo</button>
      </form>
      {mensagem && <p className="mensagem">{mensagem}</p>}
    </div>
  );
};

export default NovoConteudoCreator;
