import { useParams } from 'react-router-dom';
import './Noticia.css';

export default function Noticia9() {
  const { id } = useParams();

  return (
    <main className="noticia">
      <h1 className="noticia-titulo">RED Canids Kalunga encara TBK Esports em seu 2º jogo pelo Challengers Brazil nesta quarta (04)</h1>
      <p className="noticia-data">02 de Junho de 2025</p> 
     <img className="noticia-img" src="/foto9.jpg" alt="RED Canids e tbk" />


      <div className="noticia-conteudo">
        <p>A RED Canids Kalunga volta ao servidor nesta terça-feira (04/06) às 17h (horário de Brasília) para enfrentar a TBK Esports, em seu segundo compromisso no VALORANT Challengers Brazil 2025.</p>

        <p>A Matilha chega embalada após uma estreia de gala, quando venceu nada menos que o atual campeão da competição em uma série emocionante. A vitória deu moral ao elenco e aumentou a confiança da equipe, que agora busca manter o embalo e conquistar mais um resultado positivo rumo à classificação.</p>

        <p>"Foi uma estreia com a cara da RED: agressiva, inteligente e com muita vontade de vencer", comentou um dos jogadores em entrevista pós-jogo. A comissão técnica reforçou o foco em manter a consistência e seguir evoluindo ao longo do campeonato.</p>

        <p>Já a TBK Esports entra em busca de reabilitação e promete um confronto duro. A equipe precisa da vitória para não se complicar na tabela e deve vir preparada para tentar frear o bom momento da RED.</p>

        <p>O jogo será transmitido ao vivo pelos canais oficiais da Riot Games, e a torcida da Matilha é esperada em peso nas redes para empurrar o time rumo a mais uma vitória.</p>

      </div>
       <p className="noticia-autor">Por Marcelo Lemos</p>

       
    </main>
  );
}
