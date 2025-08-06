import { useState, useEffect } from 'react';
import './Creators.css';

// Dados estáticos dos creators com fotos e redes sociais
const creators = [
  { nome: 'MEDU', img: '/creators/Medu.jpg', twitter: 'https://x.com/medulol1', instagram: 'https://www.instagram.com/medulol1/' },
  { nome: 'ISMALAKOI', img: '/creators/Ismalakoi.jpg', twitter: 'https://x.com/Ismalakoi', instagram: 'https://www.instagram.com/ismalakoi1/' },
  { nome: 'PEU', img: '/creators/Peu.jpg', twitter: 'https://x.com/peuzinholol', instagram: 'https://www.instagram.com/peuzinholol/' },
  { nome: 'DYEN', img: '/creators/Dyen.jpg', twitter: 'https://x.com/DyenffnyM', instagram: 'https://www.instagram.com/dyenffnym/' },
  { nome: 'IASSER', img: '/creators/Iasser.jpg', twitter: 'https://x.com/iasserzinlol', instagram: 'https://www.instagram.com/iasserzinlol/' },
  { nome: 'AMMY', img: '/creators/Ammy.jpg', twitter: 'https://x.com/ammyzitta', instagram: 'https://www.instagram.com/ammyzitta/' },
  { nome: 'ISAC', img: '/creators/Isac.jpg', twitter: 'https://x.com/isac_lemus', instagram: 'https://www.instagram.com/isac.lemus/' },
  { nome: 'JOÃO DIAS', img: '/creators/João Dias.jpg', twitter: 'https://x.com/jdiasss_', instagram: 'https://www.instagram.com/jdiasss_/' },
];

// URL do backend para buscar os conteúdos dos creators
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Creators() {
  const [conteudos, setConteudos] = useState([]);
  const [filtro, setFiltro] = useState('TUDO');

  // Buscar conteúdos do backend
  useEffect(() => {
    fetch(`${API_URL}/api/conteudos-creators`)
      .then((res) => res.json())
      .then((data) => setConteudos(data))
      .catch((err) => console.error('Erro ao buscar conteúdos:', err));
  }, [API_URL]);

  // Filtra conteúdos por nome do creator (ou mostra todos)
  const conteudosFiltrados =
    filtro === 'TUDO'
      ? conteudos
      : conteudos.filter((c) => c.creator === filtro);

  // Função para renderizar o embed do vídeo conforme o tipo
  // Pode ser TikTok ou Instagram Reel — ajusta embed conforme o tipo
  const renderVideoEmbed = (conteudo) => {
    if (!conteudo.url) return null;

    if (conteudo.tipo === 'tiktok') {
      // Extrai o vídeo do TikTok para embed
      // Para simplificar, pode usar iframe com url direta (melhor usar widget oficial se quiser)
      return (
        <iframe
          title={`${conteudo.creator} TikTok`}
          src={`https://www.tiktok.com/embed/${extrairTikTokId(conteudo.url)}`}
          width="320"
          height="480"
          frameBorder="0"
          allowFullScreen
        />
      );
    }

    if (conteudo.tipo === 'reel') {
      // Instagram Reels embed simples via iframe - usa o link direto do post
      // Instagram não fornece iframe oficial simples, mas dá pra usar o link do post.
      return (
        <iframe
          title={`${conteudo.creator} Instagram Reel`}
          src={`${conteudo.url}embed`}
          width="320"
          height="480"
          frameBorder="0"
          allowFullScreen
          loading="lazy"
        />
      );
    }

    return null;
  };

  // Função para extrair o ID do TikTok da URL, para usar no embed
  function extrairTikTokId(url) {
    // Exemplo URL: https://www.tiktok.com/@username/video/1234567890
    const partes = url.split('/');
    const idx = partes.findIndex((p) => p === 'video');
    if (idx !== -1 && partes.length > idx + 1) {
      return partes[idx + 1];
    }
    return ''; // fallback
  }

  return (
    <div className="pagina-creators">
      <h1>Creators da Matilha</h1>

      {/* Fotos dos creators */}
      <section className="creators-fotos">
        {creators.map((creator) => (
          <div key={creator.nome} className="creator-card">
            <img
              src={creator.img}
              alt={creator.nome}
              title={creator.nome}
            />
            <span>{creator.nome}</span>
            <div className="social-buttons">
              {creator.twitter && (
                <a href={creator.twitter} target="_blank" rel="noopener noreferrer" className="social-btn">
                  <img src="/icons/x.png" alt="Twitter" />
                </a>
              )}
              {creator.instagram && (
                <a href={creator.instagram} target="_blank" rel="noopener noreferrer" className="social-btn">
                  <img src="/icons/instagram.png" alt="Instagram" />
                </a>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Filtros para conteúdo por creator */}
      <h2>Novos Conteúdos</h2>
      <div className="filtros">
        <button
          className={filtro === 'TUDO' ? 'ativo' : ''}
          onClick={() => setFiltro('TUDO')}
        >
          TUDO
        </button>
        {creators.map((creator) => (
          <button
            key={creator.nome}
            className={filtro === creator.nome ? 'ativo' : ''}
            onClick={() => setFiltro(creator.nome)}
          >
            {creator.nome}
          </button>
        ))}
      </div>

      {/* Lista de conteúdos filtrados */}
      <div className="lista-conteudos">
        {conteudosFiltrados.length === 0 && <p>Nenhum conteúdo para exibir.</p>}

        {conteudosFiltrados.map((conteudo) => (
          <div key={conteudo._id} className="card-conteudo">
            <strong>{conteudo.creator}</strong>
            <div className="video-embed">{renderVideoEmbed(conteudo)}</div>
            <a href={conteudo.url} target="_blank" rel="noopener noreferrer">
              Ver no site original
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
