import './Home.css'

export default function Home() {
  return (
    <main className="home">
      <section className="card-section">
        <div className="card">
          <h2>Notícias</h2>
          <p>Veja as últimas notícias sobre o time.</p>
        </div>
        <div className="card">
          <h2>Campeonatos</h2>
          <p>Acompanhe os campeonatos que a RED está disputando.</p>
        </div>
        <div className="card">
          <h2>Eventos</h2>
          <p>Saiba onde vão rolar as watch parties e encontros da torcida.</p>
        </div>
      </section>
    </main>
  )
}
