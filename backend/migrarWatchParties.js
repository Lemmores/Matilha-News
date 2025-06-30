// migrarWatchParties.js
import { MongoClient } from "mongodb";

const localUri = "mongodb://127.0.0.1:27017";
const atlasUri = "mongodb+srv://admin:Matilha123@cluster0.ru0ydbc.mongodb.net/matilhanews?retryWrites=true&w=majority&appName=Cluster0";

const dbName = "matilhanews";

async function migrarWatchParties() {
  const clienteLocal = new MongoClient(localUri);
  const clienteAtlas = new MongoClient(atlasUri);

  try {
    await clienteLocal.connect();
    await clienteAtlas.connect();

    const localDB = clienteLocal.db(dbName);
    const atlasDB = clienteAtlas.db(dbName);

    const watchPartiesLocal = await localDB.collection("watchparties").find().toArray();

    console.log(`🎉 Encontradas ${watchPartiesLocal.length} watch parties no MongoDB local`);

    if (watchPartiesLocal.length > 0) {
      await atlasDB.collection("watchparties").insertMany(watchPartiesLocal);
      console.log(`✅ Migradas ${watchPartiesLocal.length} watch parties para o MongoDB Atlas`);
    } else {
      console.log("⚠️ Nenhuma watch party para migrar.");
    }
  } catch (erro) {
    console.error("❌ Erro ao migrar:", erro);
  } finally {
    await clienteLocal.close();
    await clienteAtlas.close();
  }
}

migrarWatchParties();
