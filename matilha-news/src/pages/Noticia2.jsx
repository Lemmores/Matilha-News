import { useParams } from 'react-router-dom';

export default function Noticia2() {
  const { id } = useParams();

  // Simulação de busca de dados
  const noticia = {
    id,
    titulo: 'Título da Notícia',
    conteudo: 'Conteúdo completo da notícia vai aqui...',
    imagem: '/imgs/gen-g.jpg',
    categoria: 'League of Legends'
  };

  return (
    <div className="noticia-detalhe">
      <img src={noticia.imagem} alt={noticia.titulo} />
      <h1>{noticia.titulo}</h1>
      <p><strong>{noticia.categoria}</strong></p>
      <p>{noticia.conteudo}</p>
    </div>
  );
}
