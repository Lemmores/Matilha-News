import "./Agenda.css";

export default function AgendaCircuito() {
  const partidas = [
   
     {
      data: "09/06/2025",
      hora: "17:00",
      timeA: {
        nome: "RED Canids Academy",
        logo: "/logos/redacademy.png"
      },
      timeB: {
        nome: "Vivo Keyd Stars",
        logo: "/logos/vks.png"
      },
      campeonato: "CIRCUITO DESAFIANTE"
     
    },

    {
      data: "02/06/2025",
      hora: "17:00",
      timeA: {
        nome: "RED Canids Academy",
        logo: "/logos/redacademy.png"
      },
      timeB: {
        nome: "Vivo Keyd Stars",
        logo: "/logos/vks.png"
      },
      campeonato: "CIRCUITO DESAFIANTE"
     
    },

    {
      data: "20/05/2025",
      hora: "17:00",
      timeA: {
        nome: "RED Canids Academy",
        logo: "/logos/redacademy.png"
      },
      timeB: {
        nome: "Kabum IDL",
        logo: "/logos/kbm.png"
      },
      campeonato: "CIRCUITO DESAFIANTE"
     
    },
  ];

  return (
    <section className="agenda">
      <h2>Agenda de Jogos</h2>
      <div className="jogos">
        {partidas.map((jogo, index) => (
          <div className="jogo-card" key={index}>
            <div className="jogo-info">
              <span className="data-hora">{jogo.data} - {jogo.hora}</span>
              <span className="campeonato">{jogo.campeonato}</span>
              <span className="local">{jogo.local}</span>
            </div>
            <div className="jogo-times">
              <div className="time">
                <img src={jogo.timeA.logo} alt={jogo.timeA.nome} />
                <span>{jogo.timeA.nome}</span>
              </div>
              <span className="versus">vs</span>
              <div className="time">
                <img src={jogo.timeB.logo} alt={jogo.timeB.nome} />
                <span>{jogo.timeB.nome}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
