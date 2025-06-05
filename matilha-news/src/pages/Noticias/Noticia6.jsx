import { useParams } from 'react-router-dom';
import './Noticia.css';

export default function Noticia6() {
  const { id } = useParams();

  return (
    <main className="noticia">
      <h1 className="noticia-titulo">RED Canids Kalunga é eliminada pela Vivo Keyd Stars na LTA Sul 2025</h1>
      <p className="noticia-data">02 de Junho de 2025</p> 
     <img className="noticia-img" src="/news6.jpg" alt="RED Canids perde na LTA SUL" />


      <div className="noticia-conteudo">
        <p>No último domingo, 1º de junho, a RED Canids Kalunga foi eliminada da LTA Sul 2025 após uma série intensa contra a Vivo Keyd Stars. A partida, válida pela chave inferior, terminou com a vitória da VKS por 3 a 1, encerrando a campanha da Matilha no segundo split da competição.</p>

        <p>A série começou com a RED Canids mostrando força e vencendo o primeiro jogo. No entanto, a Vivo Keyd Stars reagiu, empatando a série no segundo confronto em um jogo que estava nas mãos da Matilha. No terceiro jogo, a VKS acordou e garantiu a vitória de uma forma mais convicente, já no quarto e último jogo, a VKS manteve o ritmo e de uma forma avassaladora venceu e eliminou a RED Canids da competição.</p>

        <p>Com essa vitória, a Vivo Keyd Stars avança na chave inferior, onde enfrentará a equipe da Isurus. O vencedor desse confronto garantirá uma vaga na final da Lower e enfrenterá o perdedor de Pain x Fúria. A RED Canids, por sua vez, encerra sua participação no torneio, ficando fora da disputa pelo título neste split. A equipe agora se prepara para os desafios futuros, buscando aprimorar seu desempenho nas próximas competições e mudanças já são esperadas na organização para o terceiro split.</p>

        <p> Confira aqui como foi o jogo:</p>

        <iframe width="820" height="400" src="https://www.youtube.com/embed/N428VJVA1JI?si=_WVQ4p99Md8znk0p" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
       <p className="noticia-autor">Por Marcelo Lemos</p>

       
    </main>
  );
}
