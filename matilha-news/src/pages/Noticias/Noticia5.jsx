import { useParams } from 'react-router-dom';
import './Noticia.css';

export default function Noticia5() {
  const { id } = useParams();

  return (
    <main className="noticia">
      <h1 className="noticia-titulo">RED Canids vence a atual campeã LOS e surpreende na Etapa 2 do VCB</h1>
      <p className="noticia-data">30 de Maio de 2025</p> 
     <img className="noticia-img" src="/news5.jpg" alt="RED Canids Valorant!" />


      <div className="noticia-conteudo">
        <p>A RED Canids Kalunga brilhou em mais uma noite de Valorant competitivo, vencendo ninguém menos que a atual campeã LOS em uma série histórica válida pela Etapa 2 do VCB (Valorant Challengers Brazil). A vitória reforça o crescimento da equipe e mostra que a Matilha está pronta para disputar de igual para igual com as gigantes do cenário.</p>

        <p>Em uma série acirrada e cheia de reviravoltas, a RED mostrou frieza, tática apurada e muita mira afiada. Mesmo diante de uma LOS experiente e entrosada, a Matilha não se intimidou e executou um plano de jogo sólido, conquistando rounds importantes em momentos decisivos.</p>

        <p>Destaque para os clutches incríveis e a atuação coletiva da RED, que soube se adaptar ao estilo de jogo da adversária e aproveitou as brechas com inteligência. A vitória não só quebra a invencibilidade recente da LOS, como também coloca a RED Canids entre os principais nomes da etapa atual.</p>

        <p>Com esse resultado, a Matilha avança com moral e ganha confiança para os próximos confrontos do campeonato, mostrando que o sonho do título está mais vivo do que nunca.</p>

        <p>A torcida respondeu em peso nas redes sociais, comemorando a vitória e reforçando o apoio incondicional à equipe.</p>

        <p> Confira aqui como foi o jogo:</p>

        <iframe width="820" height="400" src="https://www.youtube.com/embed/YVKsP4o5PC8?si=zuO-rct2FyURn1Za" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
       <p className="noticia-autor">Por Marcelo Lemos</p>

       
    </main>
  );
}
