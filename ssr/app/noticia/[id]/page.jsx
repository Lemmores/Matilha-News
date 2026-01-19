// app/noticia/[id]/page.jsx
import Head from "next/head";

export async function generateMetadata({ params }) {
  const API_URL =
    process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(
    `${API_URL}/api/noticias/${params.id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return {
      title: "Notícia não encontrada | Matilha News",
      description: "Confira as últimas notícias da Matilha News.",
    };
  }

  const noticia = await res.json();

  const descricao =
    noticia.resumo ||
    (Array.isArray(noticia.textoCompleto)
      ? noticia.textoCompleto[0]
      : noticia.textoCompleto);

  return {
    title: `${noticia.titulo} | Matilha News`,
    description: descricao,
  };
}

export default async function NoticiaPage({ params }) {
  const API_URL =
    process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(
    `${API_URL}/api/noticias/${params.id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return <h1>Notícia não encontrada</h1>;
  }

  const noticia = await res.json();

  const descricao =
    noticia.resumo ||
    (Array.isArray(noticia.textoCompleto)
      ? noticia.textoCompleto[0]
      : noticia.textoCompleto);

  return (
    <>
      <Head>
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={noticia.titulo} />
        <meta name="twitter:description" content={descricao} />
        <meta name="twitter:image" content={noticia.imagem} />

        {/* Open Graph */}
        <meta property="og:title" content={noticia.titulo} />
        <meta property="og:description" content={descricao} />
        <meta property="og:image" content={noticia.imagem} />
        <meta property="og:type" content="article" />
      </Head>

      <main style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
        <h1>{noticia.titulo}</h1>

        <p style={{ color: "#999" }}>
          {new Date(noticia.data).toLocaleDateString("pt-BR")}
          {noticia.autor && ` • ${noticia.autor}`}
        </p>

        {noticia.imagem && (
          <img
            src={noticia.imagem}
            alt={noticia.titulo}
            style={{ width: "100%", margin: "24px 0" }}
          />
        )}

        {Array.isArray(noticia.textoCompleto) &&
          noticia.textoCompleto.map((p, i) => <p key={i}>{p}</p>)}

        {noticia.videoUrl && (
          <iframe
            src={noticia.videoUrl}
            width="100%"
            height="400"
            allowFullScreen
          />
        )}
      </main>
    </>
  );
}
