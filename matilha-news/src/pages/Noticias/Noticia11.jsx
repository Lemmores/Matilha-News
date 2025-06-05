import { useParams } from 'react-router-dom';
import './Noticia.css';

export default function Noticia11() {
  const { id } = useParams();

  return (
    <main className="noticia">
      <h1 className="noticia-titulo">RED Canids anuncia reforços para o CS2 com foco no presencial da Odyssey Cup e no Major</h1>
      <p className="noticia-data">04 de Junho de 2025</p> 
     <img className="noticia-img" src="/news11.jpg" alt="RED Canids anuncia novos players" />


      <div className="noticia-conteudo">
        <p>A RED Canids Kalunga segue reforçando seu compromisso com o competitivo de Counter-Strike 2. Nesta terça-feira (04), a organização anunciou oficialmente a chegada de Kauez , Ponter e do coach Tge à line-up principal da modalidade.</p>

        <p>AOs novos integrantes chegam para fortalecer o projeto da Matilha, que já tem compromisso marcado: a Odyssey Cup, torneio presencial que acontece no próximo dia 14. A expectativa é alta, e a RED vai com tudo em busca do troféu.</p>

        <p>“AGORA É OFICIAL”, declarou a organização nas redes sociais, celebrando as contratações. “Vamos em busca do troféu no presencial da Odyssey Cup, mas vamos em busca de muito mais. Foco no Major e no processo!”, concluiu o anúncio.</p>

        <p>A entrada de kauez e Ponter representa uma renovação estratégica, mirando resultados consistentes a médio e longo prazo. Com o comando técnico de Tge, a equipe almeja evoluir taticamente e alcançar voos mais altos, com foco total na classificação para o próximo Major de CS2.</p>

        <p>OA torcida da Matilha já está mobilizada e ansiosa para ver os novos nomes em ação no servidor. O primeiro teste dessa nova fase será a Odyssey Cup, e todos os olhos estarão voltados para o desempenho da equipe.</p>

        <p>Fique ligado no Matilha News para acompanhar a cobertura completa da competição e todas as novidades do CS2 da RED Canids.</p>

      </div>
       <p className="noticia-autor">Por Marcelo Lemos</p>

       
    </main>
  );
}
