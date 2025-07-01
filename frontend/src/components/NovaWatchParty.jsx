import React, { useState, useRef } from "react";
import "./NovaWatchParty.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function NovaWatchParty() {
  const [formData, setFormData] = useState({
    titulo: "",
    data: "",
    local: "",
    imagem: null,
    grupo: "",
    linkDetalhes: "",
  });

  const [mensagem, setMensagem] = useState("");
  const inputFileRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataImg = new FormData();
    formDataImg.append("imagem", file);

    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formDataImg,
      });

      const data = await response.json();

      if (data.imageUrl) {
        setFormData((prev) => ({ ...prev, imagem: data.imageUrl }));
        setMensagem("Imagem enviada com sucesso!");
      } else {
        setMensagem("Erro ao enviar imagem.");
      }
    } catch (error) {
      console.error("Erro no upload da imagem:", error);
      setMensagem("Erro ao enviar imagem.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.titulo ||
      !formData.data ||
      !formData.local ||
      !formData.imagem ||
      !formData.grupo
    ) {
      setMensagem("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/watchparties`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMensagem("Watch Party criada com sucesso!");
        setFormData({
          titulo: "",
          data: "",
          local: "",
          imagem: null,
          grupo: "",
          linkDetalhes: "",
        });
        if (inputFileRef.current) {
          inputFileRef.current.value = "";
        }
      } else {
        setMensagem("Erro ao criar Watch Party.");
      }
    } catch (error) {
      console.error(error);
      setMensagem("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="nova-watchparty">
      <h2>Nova Watch Party</h2>
      <form onSubmit={handleSubmit} className="nova-watchparty-form">
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={formData.titulo}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="data"
          placeholder="Data (dd/mm/aaaa)"
          value={formData.data}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="local"
          placeholder="Local"
          value={formData.local}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          name="imagem"
          accept="image/*"
          onChange={handleImageUpload}
          ref={inputFileRef}
          required
        />

        <input
          type="url"
          name="grupo"
          placeholder="Link do grupo WhatsApp"
          value={formData.grupo}
          onChange={handleChange}
          required
        />

        <input
          type="url"
          name="linkDetalhes"
          placeholder="Link de detalhes (Instagram, etc)"
          value={formData.linkDetalhes}
          onChange={handleChange}
        />

        <button type="submit">Criar Watch Party</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}
