import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const router = express.Router();

// Rota de login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Preencha todos os campos." });
  }

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const senhaCorreta = await bcrypt.compare(password, admin.password);
    if (!senhaCorreta) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      "segredo_super_secreto", // ideal mover para variável de ambiente
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor." });
  }
});

export default router;
