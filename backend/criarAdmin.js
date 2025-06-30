// criarAdmin.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Admin from "./models/Admin.js"; // repare no `.js` no final!

const MONGO_URI = "mongodb+srv://admin:Matilha123@cluster0.ru0ydbc.mongodb.net/matilhanews?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI);

async function criarAdmin() {
  const username = "Lemores";
  const password = "Lemores07";

  const senhaHash = await bcrypt.hash(password, 10);

  const admin = new Admin({ username, password: senhaHash });
  await admin.save();
  console.log("✅ Administrador criado com sucesso!");

  mongoose.connection.close();
}

criarAdmin();
