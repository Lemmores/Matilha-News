import { useParams } from 'react-router-dom';
import './Noticia.css';

export default function Noticia4() {
  const { id } = useParams();

  return (
    <main className="noticia">
      <h1 className="noticia-titulo">RED Canids Academy enfrenta paiN Gaming Academy valendo vaga na final da Série A da Gamers Club</h1>
      <p className="noticia-data">30 de Maio de 2025</p>
     <img className="noticia-img" src="/news4.jpg" alt="RED Canids vs Pain" />


      <div className="noticia-conteudo">
        <p>Hoje é dia de confronto decisivo no cenário nacional de CS2! A RED Canids Kalunga Academy encara a paiN Gaming Academy em uma partida valendo a tão sonhada vaga na final da Série A da Gamers Club, uma das competições mais importantes do circuito brasileiro.</p>

        <p>O duelo promete ser eletrizante, reunindo duas das principais equipes da cena acadêmica, ambas com campanhas sólidas e destaque no cenário competitivo. A RED Academy vem embalada por boas atuações nas fases anteriores, mostrando consistência e entrosamento — elementos que serão fundamentais na disputa de hoje.</p>

        <p>A rivalidade entre RED e paiN sempre chama atenção dos torcedores, e no CS2 não é diferente. A expectativa é de um jogo equilibrado, com muita troca de tiros, estratégias afiadas e jogadores jovens mostrando seu talento em busca da grande final.</p>

        <p>O confronto acontece hoje às 19 horas e será transmitido nos canais oficiais da Gamers Club, com cobertura ao vivo e comentários da comunidade.</p>

      </div>
      <p className="noticia-autor">Por Marcelo Lemos</p>
    </main>
  );
}
