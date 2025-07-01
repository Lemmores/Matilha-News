import React, { useState, useRef } from "react";
import "./NovaNoticia.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const NovaNoticia = () => {
  const [formData, setFormData] = useState({
    titulo: "",
    data: "",
    imagem: null,
    conteudo: "",
    autor: "",
    categoria: "",
    videoUrl: "",
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
      console.error("Erro ao fazer upload da imagem:", error);
      setMensagem("Erro ao enviar imagem.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const noticiaFormatada = {
        titulo: formData.titulo,
        data: new Date(formData.data).toISOString(),
        imagem: formData.imagem,
        textoCompleto: formData.conteudo.split("\n").filter(Boolean),
        autor: formData.autor,
        categoria: formData.categoria,
        videoUrl: formData.videoUrl,
      };

      const response = await fetch(`${API_URL}/api/noticias`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(noticiaFormatada),
      });

      if (response.ok) {
        setMensagem("Notícia enviada com sucesso!");
        setFormData({
          titulo: "",
          data: "",
          imagem: null,
          conteudo: "",
          autor: "",
          categoria: "",
          videoUrl: "",
        });
        if (inputFileRef.current) {
          inputFileRef.current.value = "";
        }
      } else {
        setMensagem("Erro ao enviar notícia.");
      }
    } catch (error) {
      console.error(error);
      setMensagem("Erro de conexão ou upload da imagem.");
    }
  };

  return (
    <div className="nova-noticia nova-noticia-container">
      <h2>Adicionar Nova Notícia</h2>
      <form onSubmit={handleSubmit} className="nova-noticia-form">
        <input
          type="text"
          name="titulo"
          placeholder="Título da notícia"
          value={formData.titulo}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="data"
          placeholder="Data"
          value={formData.data}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="imagem"
          accept="image/*"
          onChange={handleImageUpload}
          ref={inputFileRef}
        />
        <textarea
          name="conteudo"
          placeholder="Conteúdo da notícia (separe os parágrafos com quebras de linha)"
          value={formData.conteudo}
          onChange={handleChange}
          required
          rows={10}
        ></textarea>
        <input
          type="text"
          name="autor"
          placeholder="Autor"
          value={formData.autor}
          onChange={handleChange}
        />
        <select
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          required
        >
          <option value="">Selecione uma categoria</option>
          <option value="LTA SUL">LTA SUL</option>
          <option value="CIRCUITO DESAFIANTE">CIRCUITO DESAFIANTE</option>
          <option value="VALORANT">VALORANT</option>
          <option value="CS2">CS2</option>
          <option value="EXTRAS">EXTRAS</option>
        </select>

        <input
          type="text"
          name="videoUrl"
          placeholder="URL do vídeo do YouTube (opcional)"
          value={formData.videoUrl}
          onChange={handleChange}
        />

        <button type="submit">Enviar Notícia</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default NovaNoticia;
