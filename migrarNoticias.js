const { MongoClient } = require('mongodb');

// URIs
const LOCAL_URI = 'mongodb://127.0.0.1:27017';
const ATLAS_URI = 'mongodb+srv://admin:Matilha123@cluster0.ru0ydbc.mongodb.net/matilhanews?retryWrites=true&w=majority&appName=Cluster0';

// Nome do banco e coleção
const DB_NAME = 'matilhanews';
const COLLECTION_NAME = 'noticias';

async function migrarNoticias() {
  const clientLocal = new MongoClient(LOCAL_URI);
  const clientAtlas = new MongoClient(ATLAS_URI);

  try {
    await clientLocal.connect();
    const dbLocal = clientLocal.db(DB_NAME);
    const noticiasLocal = await dbLocal.collection(COLLECTION_NAME).find().toArray();

    console.log(`📰 Encontradas ${noticiasLocal.length} notícias no MongoDB local`);

    await clientAtlas.connect();
    const dbAtlas = clientAtlas.db(DB_NAME);
    const collectionAtlas = dbAtlas.collection(COLLECTION_NAME);

    if (noticiasLocal.length > 0) {
      const result = await collectionAtlas.insertMany(noticiasLocal);
      console.log(`✅ Migradas ${result.insertedCount} notícias para o MongoDB Atlas`);
    } else {
      console.log('⚠️ Nenhuma notícia encontrada para migrar');
    }

  } catch (err) {
    console.error('❌ Erro na migração:', err);
  } finally {
    await clientLocal.close();
    await clientAtlas.close();
  }
}

migrarNoticias();
