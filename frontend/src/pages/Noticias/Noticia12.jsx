import { useParams } from 'react-router-dom';
import './Noticia.css';

export default function Noticia12() {
  const { id } = useParams();

  return (
    <main className="noticia">
      <h1 className="noticia-titulo"> uZent, suporte da RED Academy, alcança o Top 1 da SoloQ brasileira</h1>
      <p className="noticia-data">05 de Junho de 2025</p> 
     <img className="noticia-img" src="/news12.jpg" alt="uZent" />


      <div className="noticia-conteudo">
        <p>A base vem forte! O suporte uZent, da RED Canids Kalunga Academy, conquistou nesta semana o Top 1 da Solo Queue brasileira, consolidando seu nome como um dos principais destaques da nova geração do competitivo.</p>

        <p>Além do desempenho individual nas filas ranqueadas, uZent também vive uma grande fase no cenário profissional: a RED Academy está na final do Circuito Desafiante, e o jogador é peça fundamental na campanha da Matilha. Ele volta ao Rift na próxima segunda-feira em busca do título da competição.</p>

        <p>Com mecânica apurada e leitura de jogo precisa, uZent tem se destacado por atuações consistentes e versatilidade, com picks que vão desde os tradicionais suportes de engage até escolhas criativas como Neeko e Hell.</p>

        <p>A conquista do Top 1 reforça ainda mais os rumores de que o jogador está cotado para integrar o time principal no próximo split. O futuro parece promissor para o suporte da Matilha.</p>

        <p>Fique ligado no Matilha News para acompanhar a cobertura completa da final do Circuito Desafiante</p>

      </div>
       <p className="noticia-autor">Por Marcelo Lemos</p>

    </main>
  );
}
