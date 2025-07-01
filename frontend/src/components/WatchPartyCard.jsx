import './WatchParties.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function WatchPartyCard({ evento }) {
  return (
    <div className="watch-card">
      <img
        src={`${API_URL}${evento.imagem}`}
        alt={evento.titulo}
        className="watch-img"
      />
      <div className="watch-info">
        <h2>{evento.titulo}</h2>
        <p><strong>Data:</strong> {evento.data}</p>
        <p><strong>Local:</strong> {evento.local}</p>
        <a href={evento.grupo} target="_blank" rel="noreferrer" className="btn-wpp">
          Entrar no Grupo do WhatsApp
        </a>
        <a href={evento.linkDetalhes} target="_blank" rel="noreferrer" className="btn-detalhes">
          Ver mais detalhes
        </a>
      </div>
    </div>
  );
}
