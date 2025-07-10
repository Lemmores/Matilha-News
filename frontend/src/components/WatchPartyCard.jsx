import './WatchParties.css';

export default function WatchPartyCard({ evento }) {
  return (
    <div className="watch-card">
      {evento.imagem && (
        <img
          src={evento.imagem}
          alt={evento.titulo}
          className="watch-img"
        />
      )}
      <div className="watch-info">
        <h2>{evento.titulo}</h2>
        <p><strong>Data:</strong> {evento.data}</p>
        <p><strong>Local:</strong> {evento.local}</p>
        <a href={evento.grupo} target="_blank" rel="noreferrer" className="btn-wpp">
          Entrar no Grupo do WhatsApp
        </a>
        {evento.linkDetalhes && (
          <a href={evento.linkDetalhes} target="_blank" rel="noreferrer" className="btn-detalhes">
            Ver mais detalhes
          </a>
        )}
      </div>
    </div>
  );
}
