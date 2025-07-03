import { useState } from "react";
import axios from "axios";
import "./NovaAgenda.css";

export default function NovaAgenda() {
  const [form, setForm] = useState({
    data: "",
    hora: "",
    campeonato: "",
    local: "",
    timeA_nome: "",
    timeA_logo: "",
    timeB_nome: "",
    timeB_logo: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e, time) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("imagem", file);

    try {
      const res = await axios.post("/api/upload", formData);
      const logoUrl = res.data.url; // depende da sua resposta do backend
      setForm((prev) => ({
        ...prev,
        [time]: logoUrl,
      }));
    } catch (err) {
      console.error("Erro ao fazer upload da imagem:", err);
      alert("Erro ao fazer upload da imagem.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novaAgenda = {
      data: form.data,
      hora: form.hora,
      campeonato: form.campeonato,
      local: form.local,
      timeA: {
        nome: form.timeA_nome,
        logo: form.timeA_logo,
      },
      timeB: {
        nome: form.timeB_nome,
        logo: form.timeB_logo,
      },
    };

    try {
      await axios.post("/api/agenda", novaAgenda);
      alert("Partida cadastrada com sucesso!");
      setForm({
        data: "",
        hora: "",
        campeonato: "",
        local: "",
        timeA_nome: "",
        timeA_logo: "",
        timeB_nome: "",
        timeB_logo: "",
      });
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
        <input
          name="campeonato"
          value={form.campeonato}
          onChange={handleChange}
          placeholder="Campeonato"
          required
        />
        <input
          name="local"
          value={form.local}
          onChange={handleChange}
          placeholder="Local (opcional)"
        />

        <h4>Time A</h4>
        <input
          name="timeA_nome"
          value={form.timeA_nome}
          onChange={handleChange}
          placeholder="Nome do Time A"
          required
        />
        <input
          type="file"
          onChange={(e) => handleFileChange(e, "timeA_logo")}
          accept="image/*"
          required
        />
        {form.timeA_logo && (
          <img
            src={form.timeA_logo}
            alt="Prévia logo Time A"
            style={{ maxHeight: "50px", marginTop: "0.5rem" }}
          />
        )}

        <h4>Time B</h4>
        <input
          name="timeB_nome"
          value={form.timeB_nome}
          onChange={handleChange}
          placeholder="Nome do Time B"
          required
        />
        <input
          type="file"
          onChange={(e) => handleFileChange(e, "timeB_logo")}
          accept="image/*"
          required
        />
        {form.timeB_logo && (
          <img
            src={form.timeB_logo}
            alt="Prévia logo Time B"
            style={{ maxHeight: "50px", marginTop: "0.5rem" }}
          />
        )}

        <button type="submit">Cadastrar Partida</button>
      </form>
    </div>
  );
}