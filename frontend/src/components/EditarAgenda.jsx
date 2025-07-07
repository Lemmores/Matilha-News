import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./NovaAgenda.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function EditarAgenda() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileRefA = useRef(null);
  const fileRefB = useRef(null);

  const [form, setForm] = useState({
    timeA_nome: "",
    timeA_logo: "",
    timeB_nome: "",
    timeB_logo: "",
    data: "",
    hora: "",
    campeonato: "",
    local: "",
  });

  useEffect(() => {
    const fetchPartida = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/agenda/${id}`);
        const partida = res.data;
        setForm({
          timeA_nome: partida.timeA.nome,
          timeA_logo: partida.timeA.logo,
          timeB_nome: partida.timeB.nome,
          timeB_logo: partida.timeB.logo,
          data: partida.data,
          hora: partida.hora,
          campeonato: partida.campeonato,
          local: partida.local || "",
        });
      } catch (err) {
        console.error("Erro ao buscar partida:", err);
      }
    };
    fetchPartida();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const uploadImagem = async (file) => {
    const formData = new FormData();
    formData.append("imagem", file);
    const res = await axios.post(`${API_URL}/upload`, formData);
    return res.data.imageUrl;
  };

  const handleFileChange = async (e, time) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const imageUrl = await uploadImagem(file);
      setForm((prev) => ({
        ...prev,
        [`${time}_logo`]: imageUrl,
      }));
      localStorage.setItem(`logo_${form[`${time}_nome`]}`, imageUrl);
    } catch (err) {
      console.error("Erro ao fazer upload da imagem:", err);
      alert("Erro ao fazer upload.");
    }
  };

  const handleNomeChange = (e, time) => {
    const nome = e.target.value;
    const logoSalva = localStorage.getItem(`logo_${nome}`);
    setForm((prev) => ({
      ...prev,
      [`${time}_nome`]: nome,
      [`${time}_logo`]: logoSalva || "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const partidaAtualizada = {
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
      await axios.put(`${API_URL}/api/agenda/${id}`, partidaAtualizada);
      alert("Partida atualizada com sucesso!");
      navigate("/gerenciar-agenda");
    } catch (err) {
      console.error("Erro ao atualizar partida:", err);
      alert("Erro ao atualizar partida.");
    }
  };

  return (
    <div className="nova-agenda">
      <h2>Editar Partida</h2>
      <form onSubmit={handleSubmit}>
        <input name="data" value={form.data} onChange={handleChange} placeholder="Data (ex: 09/07)" required />
        <input name="hora" value={form.hora} onChange={handleChange} placeholder="Hora (ex: 18:00)" required />
        <select name="campeonato" value={form.campeonato} onChange={handleChange} required>
          <option value="">Selecione o campeonato</option>
          <option value="LTA SUL">LTA SUL</option>
          <option value="CIRCUITO DESAFIANTE">CIRCUITO DESAFIANTE</option>
          <option value="CS2">CS2</option>
          <option value="VALORANT">VALORANT</option>
        </select>
        <input name="local" value={form.local} onChange={handleChange} placeholder="Local (opcional)" />

        <h4>Time A</h4>
        <input
          name="timeA_nome"
          value={form.timeA_nome}
          onChange={(e) => handleNomeChange(e, "timeA")}
          placeholder="Nome do Time A"
          required
        />
        {!form.timeA_logo && (
          <input type="file" onChange={(e) => handleFileChange(e, "timeA")} accept="image/*" ref={fileRefA} />
        )}
        {form.timeA_logo && (
          <img src={form.timeA_logo} alt="Logo Time A" style={{ maxHeight: "50px", marginTop: "5px" }} />
        )}

        <h4>Time B</h4>
        <input
          name="timeB_nome"
          value={form.timeB_nome}
          onChange={(e) => handleNomeChange(e, "timeB")}
          placeholder="Nome do Time B"
          required
        />
        {!form.timeB_logo && (
          <input type="file" onChange={(e) => handleFileChange(e, "timeB")} accept="image/*" ref={fileRefB} />
        )}
        {form.timeB_logo && (
          <img src={form.timeB_logo} alt="Logo Time B" style={{ maxHeight: "50px", marginTop: "5px" }} />
        )}

        <button type="submit">Atualizar Partida</button>
      </form>
    </div>
  );
}
