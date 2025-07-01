import express from "express";
import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// Rota de login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ error: "Usuário não encontrado" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ error: "Senha incorreta" });

    const token = jwt.sign({ id: admin._id }, "secreto-matilha", { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

// Rota de teste para verificar se auth está funcionando
router.get('/test', (req, res) => {
  res.json({ message: 'Rota /api/auth funcionando!' });
});

export default router;
