import { useState, useRef } from "react";
import axios from "axios";
import "./NovaAgenda.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function NovaAgenda() {
  const [form, setForm] = useState({
    data: "",
    hora: "",
    campeonato: "",
    local: "",
    adversario_nome: "",
    adversario_logo: "",
  });

  const inputFileRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("imagem", file);

    try {
      const res = await axios.post(`${API_URL}/upload`, formData);
      const logoUrl = res.data.imageUrl;

      setForm((prev) => ({
        ...prev,
        adversario_logo: logoUrl,
      }));

      // Armazena a imagem associada ao nome do time no localStorage
      localStorage.setItem(`logo_${form.adversario_nome}`, logoUrl);
    } catch (err) {
      console.error("Erro ao fazer upload da imagem:", err);
      alert("Erro ao fazer upload da imagem.");
    }
  };

  const handleNomeAdversarioChange = async (e) => {
    const nome = e.target.value;
    const logoSalva = localStorage.getItem(`logo_${nome}`);

    // Testa se a imagem realmente existe no servidor
    let logoValida = "";
    if (logoSalva) {
      try {
        await axios.get(`${API_URL}${logoSalva}`);
        logoValida = logoSalva;
      } catch {
        localStorage.removeItem(`logo_${nome}`);
      }
    }

    setForm((prev) => ({
      ...prev,
      adversario_nome: nome,
      adversario_logo: logoValida,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novaAgenda = {
      data: form.data,
      hora: form.hora,
      campeonato: form.campeonato,
      local: form.local,
      timeA: {
        nome: "RED Canids",
        logo: "/logos/red-logo.png",
      },
      timeB: {
        nome: form.adversario_nome,
        logo: form.adversario_logo,
      },
    };

    try {
      await axios.post(`${API_URL}/api/agenda`, novaAgenda);
      alert("Partida cadastrada com sucesso!");
      setForm({
        data: "",
        hora: "",
        campeonato: "",
        local: "",
        adversario_nome: "",
        adversario_logo: "",
      });
      if (inputFileRef.current) {
        inputFileRef.current.value = "";
      }
    } catch (err) {
      console.error("Erro ao cadastrar agenda:", err);
      alert("Erro ao cadastrar agenda.");
    }
  };

  return (
    <div className="nova-agenda">
      <h2>Nova Partida</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="data"
          value={form.data}
          onChange={handleChange}
          placeholder="Data (ex: 09/07)"
          required
        />
        <input
          name="hora"
          value={form.hora}
          onChange={handleChange}
          placeholder="Hora (ex: 18:00)"
          required
        />

        <select
          name="campeonato"
          value={form.campeonato}
          onChange={handleChange}
          required
        >
          <option value="">Selecione o campeonato</option>
          <option value="LTA SUL">LTA SUL</option>
          <option value="CIRCUITO DESAFIANTE">CIRCUITO DESAFIANTE</option>
          <option value="CS2">CS2</option>
          <option value="VALORANT">VALORANT</option>
        </select>

        <input
          name="local"
          value={form.local}
          onChange={handleChange}
          placeholder="Local (opcional)"
        />

        <h4>Time Adversário</h4>
        <input
          name="adversario_nome"
          value={form.adversario_nome}
          onChange={handleNomeAdversarioChange}
          placeholder="Nome do Time Adversário"
          required
        />

        {!form.adversario_logo && (
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            ref={inputFileRef}
            required
          />
        )}

        {form.adversario_logo && (
          <img
            src={`${API_URL}${form.adversario_logo}`}
            alt="Logo do adversário"
            style={{ maxHeight: "50px", marginTop: "0.5rem" }}
          />
        )}

        <button type="submit">Cadastrar Partida</button>
      </form>
    </div>
  );
}
