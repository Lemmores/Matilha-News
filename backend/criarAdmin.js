// criarAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./models/Admin");

mongoose.connect("mongodb://localhost:27017/matilhanews");

async function criarAdmin() {
  const username = "Lemores";
  const password = "Lemores07";

  const senhaHash = await bcrypt.hash(password, 10);

  const admin = new Admin({ username, password: senhaHash });
  await admin.save();
  console.log("Administrador criado com sucesso!");

  mongoose.connection.close();
}

criarAdmin();