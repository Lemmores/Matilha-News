// app/noticia/[id]/page.jsx

export async function generateMetadata({ params }) {
  const { id } = await params;

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${API_URL}/api/noticias/${id}`, {
    cache: "no-store",
  });

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
    openGraph: {
      title: noticia.titulo,
      description: descricao,
      images: [noticia.imagem],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: noticia.titulo,
      description: descricao,
      images: [noticia.imagem],
    },
  };
}

export default async function NoticiaPage({ params }) {
  const { id } = await params;

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${API_URL}/api/noticias/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <h1>Notícia não encontrada</h1>;
  }

  const noticia = await res.json();

  return (
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
  );
}
