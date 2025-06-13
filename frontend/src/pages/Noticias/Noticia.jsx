import { useParams } from 'react-router-dom';
import './Noticia.css';

export default function Noticia() {
  const { id } = useParams();

  return (
    <main className="noticia">
      <h1 className="noticia-titulo">RED Canids enfrentará a Vivo Keyd Stars valendo a vida na LTA SUL!</h1>
      <p className="noticia-data">28 de Maio de 2025</p>
      <img className="noticia-img" src="/news1.jpg" alt="RED Canids vs Vivo Keyd Stars" />
      <div className="noticia-conteudo">
        <p>A RED Canids Kalunga entra em Summoner’s Rift para o confronto mais importante do split até agora. Com a sobrevivência na competição em jogo, a equipe rubro-negra enfrentará a Vivo Keyd Stars em um duelo decisivo.</p>

        <p>Após uma campanha marcada por altos e baixos, a Matilha precisa demonstrar toda sua garra e união para garantir a vitória. O técnico Aegis afirmou em entrevista que os treinos da semana foram os mais intensos da temporada: “Estamos focados, os jogadores sabem da responsabilidade e do peso dessa partida.”</p>

        <p>Do outro lado, a Vivo Keyd Stars promete não facilitar, buscando também garantir sua permanência nos playoffs. A rivalidade entre as equipes aumenta ainda mais a tensão do confronto, que promete grandes emoções para os fãs de LoL.</p>

        <p>Nas redes sociais, a torcida da RED está mobilizada. A hashtag #VamosMatilha já é tendência, e os torcedores prometem transformar o chat em um verdadeiro mar vermelho de apoio durante a transmissão.</p>

        <p>O confronto acontece neste sábado às 13h com transmissão oficial nos canais da Riot Games. A expectativa é de casa cheia e jogo épico!</p>
      </div>
      <p className="noticia-autor">Por Marcelo Lemos</p>
    </main>
  );
}
