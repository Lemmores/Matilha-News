import { useParams } from 'react-router-dom';
import './Noticia.css';

export default function Noticia7() {
  const { id } = useParams();

  return (
    <main className="noticia">
      <h1 className="noticia-titulo">RED Canids Kalunga vence a VKS e está na final do Circuito Desafiante!</h1>
      <p className="noticia-data">02 de Junho de 2025</p> 
     <img className="noticia-img" src="/news7.jpg" alt="RED Canids vence a VKS" />


      <div className="noticia-conteudo">
        <p>A RED Canids Kalunga segue imbatível no Circuito Desafiante 2025. Na noite desta segunda-feira (2), a Matilha venceu a Vivo Keyd Stars por 3 a 0 em uma série dominante e garantiu sua vaga na grande final do campeonato. Com o resultado, a RED amplia sua impressionante sequência invicta para 17 jogos sem perder sequer uma partida ao longo da competição.</p>

        <p>Um dos grandes destaques da série foi o argentino Kaze, que desde que entrou para a line-up da RED vem demonstrando um desempenho consistente e decisivo. Atuando com muita segurança e versatilidade, Kaze teve impacto direto em todas as partidas da série contra a VKS, sendo peça fundamental na construção da vitória da equipe.</p>

        <p>A RED Canids demonstrou controle total nos três jogos da série, com ótimas leituras de mapa, execução precisa e um jogo coletivo cada vez mais afiado. A equipe não apenas venceu — ela convenceu, dominando o adversário em todas as frentes.</p>

        <p>Agora, a Matilha aguarda o vencedor da final da lower para disputar o título do primeiro split do Circuito Desafiante 2025. A final está marcada para a próximo segunda (9), às 17h, com transmissão ao vivo pelos canais oficiais do torneio.</p>

        <p> Confira aqui como foi os jogos:</p>

        <iframe width="820" height="400" src="https://www.youtube.com/embed/dL78jDWGVSA?si=gqPuVPOE4Pc1jG0R" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
       <p className="noticia-autor">Por Marcelo Lemos</p>

       
    </main>
  );
}
