import { useParams } from 'react-router-dom';
import './Noticia.css';

export default function Noticia8() {
  const { id } = useParams();

  return (
    <main className="noticia">
      <h1 className="noticia-titulo">Donos da RED prometem reformulação após queda na LTA SUL</h1>
      <p className="noticia-data">02 de Junho de 2025</p> 
     <img className="noticia-img" src="/news8.jpg" alt="RED Canids COLETIVA" />


      <div className="noticia-conteudo">
        <p>Na noite deste domingo (1º), os donos da RED Canids Kalunga convocaram uma coletiva de imprensa logo após a eliminação precoce da equipe na LTA SUL 2025, e não pouparam palavras ao expressar insatisfação com o desempenho apresentado pelo time ao longo do torneio.</p>

        <p>Durante a coletiva, marcada por um tom firme e direto, os dirigentes da Matilha fizeram questão de reconhecer o esforço da equipe, mas deixaram claro que os resultados ficaram muito abaixo do esperado. "A camisa da RED pesa, e temos consciência da responsabilidade que carregamos com a nossa torcida. O desempenho na LTA SUL não representou a grandeza da organização", declarou um dos sócios.</p>

        <p>Além das críticas, a coletiva também trouxe anúncios importantes. A diretoria confirmou que o atual split será encerrado com uma reestruturação interna, e que mudanças significativas no elenco e na comissão técnica estão sendo planejadas para o próximo ciclo competitivo. "Não estamos aqui apenas para participar, estamos aqui para vencer. E para isso, mudanças são necessárias", afirmou o CEO da organização.</p>

        <p>A fala repercutiu rapidamente nas redes sociais, gerando tanto apoio dos torcedores mais exigentes quanto preocupação por parte dos fãs mais apegados ao atual elenco. Muitos agora especulam quais jogadores podem deixar a equipe e quais nomes podem chegar para reforçar a Matilha.</p>

        <p>A RED Canids Kalunga, uma das organizações mais tradicionais do cenário, promete voltar ainda mais forte para o próximo split. A torcida agora aguarda os próximos passos da diretoria, ansiosa por novidades e reforços que possam recolocar o time no topo da LTA SUL.</p>

      </div>
       <p className="noticia-autor">Por Marcelo Lemos</p>

       
    </main>
  );
}
