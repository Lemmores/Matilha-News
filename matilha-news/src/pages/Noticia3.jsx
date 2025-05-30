import { useParams } from 'react-router-dom';
import './Noticia.css';

export default function Noticia3() {
  const { id } = useParams();

  return (
    <main className="noticia">
      <h1 className="noticia-titulo">RED Canids Kalunga Academy lança vídeo divertido mostrando os bastidores da preparação para a final da Upper no Circuito Desafiante</h1>
      <p className="noticia-data">30 de Maio de 2025</p>
      
        <div className="video-container" style={{ margin: '20px 0' }}>
  <iframe width="820" height="400" src="https://www.youtube.com/embed/WVh0zOe7JcU?si=ID7YRdkXNiwgU10o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>


      <div className="noticia-conteudo">
        <p>O canal oficial da RED Canids Kalunga publicou nesta semana um vídeo especial 
            que mostra um pouco do dia a dia da equipe Academy durante a intensa preparação 
            para a final da Upper no Circuito Desafiante. O conteúdo traz momentos descontraídos, 
            cenas dos treinos e o ambiente de união entre os jogadores, revelando uma faceta 
            diferente do time que vai muito além das partidas competitivas.</p>

        <p>Destaque para o mid laner argentino Kaze, jovem talento que vem se adaptando muito bem ao
             cenário brasileiro. Kaze compartilha nos bastidores a sua experiência, mostrando como tem
              curtido o clima do Brasil e o carinho dos torcedores da RED Canids. A paixão do jogador 
              pelo time e a torcida fica clara ao longo do vídeo, reforçando o entrosamento do grupo 
              para a grande decisão que se aproxima.</p>

        <p>Com a final da Upper marcada para os próximos dias, o vídeo é um convite para os fãs 
            acompanharem de perto a preparação do time e vibrarem junto com a RED Canids Kalunga Academy 
            rumo à conquista do título no Circuito Desafiante.</p>

        <p>Confira o vídeo completo no canal oficial da RED Canids Kalunga e fique por dentro de 
            tudo que acontece nos bastidores da equipe que promete fortes emoções nesta final!</p>

      </div>
      <p className="noticia-autor">Por Marcelo Lemos</p>
    </main>
  );
}
