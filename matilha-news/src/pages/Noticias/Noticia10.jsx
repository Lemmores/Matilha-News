import { useParams } from 'react-router-dom';
import './Noticia.css';

export default function Noticia10() {
  const { id } = useParams();

  return (
    <main className="noticia">
      <h1 className="noticia-titulo">RED Canids vence TBK Esports por 2 a 1 e segue invicta no Challengers Brazil 2025</h1>
      <p className="noticia-data">04 de Junho de 2025</p> 
     <img className="noticia-img" src="/news10.jpg" alt="RED Canids vence TBK" />


      <div className="noticia-conteudo">
        <p>A RED Canids Kalunga segue firme na caminhada pelo VALORANT Challengers Brazil 2025. Nesta terça-feira (04), a Matilha voltou ao servidor e conquistou uma importante vitória por 2 a 1 sobre a TBK Esports, em uma série equilibrada e cheia de emoções.</p>

        <p>Após uma estreia dominante contra o atual campeão, a RED mostrou que o bom momento não foi por acaso. Apesar da TBK ter oferecido resistência e vencido um dos mapas, a Matilha soube manter o controle emocional e garantiu a vitória nos momentos decisivos, demonstrando organização tática e sangue frio nos rounds finais.</p>

        <p>Com o resultado, a RED Canids chega à sua segunda vitória consecutiva e se firma entre os líderes da competição, aumentando suas chances de classificação para a próxima fase. Já a TBK Esports acumula sua segunda derrota e terá que buscar recuperação nos próximos jogos.</p>

        <p>A torcida da Matilha, mais uma vez, fez bonito nas redes sociais, apoiando a equipe durante toda a transmissão.</p>

        <p>O próximo compromisso da RED Canids será anunciado em breve. Enquanto isso, a equipe segue treinando forte, com os olhos voltados para a classificação e o sonho do título.</p>

        <p>Confira aqui como foi o jogo:</p>

        <iframe width="820" height="400" src="https://www.youtube.com/embed/J-uhEBHP-U8?si=8uSYtpIkRobz5roP" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
       <p className="noticia-autor">Por Marcelo Lemos</p>

       
    </main>
  );
}
