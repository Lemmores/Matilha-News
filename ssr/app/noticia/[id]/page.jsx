// app/noticia/[id]/page.jsx

export async function generateMetadata({ params }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Segurança: se a env não existir
  if (!API_URL) {
    return {
      title: "Matilha News",
      description: "Notícia",
    };
  }

  const res = await fetch(
    `${API_URL}/noticias/${params.id}`,
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
      : noticia.textoCompleto) ||
    "Confira as últimas notícias da Matilha News.";

  return {
    title: `${noticia.titulo} | Matilha News`,
    description: descricao,

    openGraph: {
      title: noticia.titulo,
      description: descricao,
      type: "article",
      images: noticia.imagem
        ? [
            {
              url: noticia.imagem,
              width: 1200,
              height: 630,
              alt: noticia.titulo,
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      title: noticia.titulo,
      description: descricao,
      images: noticia.imagem ? [noticia.imagem] : [],
    },
  };
}

export default async function NoticiaPage({ params }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(
    `${API_URL}/noticias/${params.id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return (
      <main style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
        <h1>Notícia não encontrada</h1>
      </main>
    );
  }

  const noticia = await res.json();

  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <h1>{noticia.titulo}</h1>

      <p style={{ color: "#999", marginTop: 8 }}>
        {new Date(noticia.data).toLocaleDateString("pt-BR")}
        {noticia.autor && ` • ${noticia.autor}`}
      </p>

      {noticia.imagem && (
        <img
          src={noticia.imagem}
          alt={noticia.titulo}
          style={{
            width: "100%",
            margin: "24px 0",
            borderRadius: 8,
          }}
        />
      )}

      {Array.isArray(noticia.textoCompleto) &&
        noticia.textoCompleto.map((paragrafo, index) => (
          <p
            key={index}
            style={{ lineHeight: 1.6, marginBottom: 16 }}
          >
            {paragrafo}
          </p>
        ))}

      {noticia.videoUrl && (
        <iframe
          src={noticia.videoUrl}
          width="100%"
          height="400"
          allowFullScreen
          style={{ marginTop: 24, borderRadius: 8 }}
        />
      )}
    </main>
  );
}
