import { Router } from "express";
import prisma from "../prisma.js";

const router = Router();

const str = (v) => String(v ?? "").trim();
const parseId = (v) => {
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
};

router.post("/", async (req, res, next) => {
  try {
    const nome = str(req.body.nome);
    const email = str(req.body.email);
    const telefone = str(req.body.telefone);
    const descricao = str(req.body.descricao);

    if (!nome || !email || !telefone) {
      return res
        .status(400)
        .json({ erro: "nome, email e telefone são obrigatórios" });
    }

    const pessoa = await prisma.pessoa.create({
      data: { nome, email, telefone, descricao: descricao || null },
    });

    return res.status(201).json(pessoa);
  } catch (err) {
    if (err && err.code === "P2002") {
      return res.status(409).json({ erro: "E-mail já cadastrado" });
    }
    return next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const pessoas = await prisma.pessoa.findMany();
    return res.json(pessoas);
  } catch (err) {
    return next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ erro: "id inválido" });

    const pessoa = await prisma.pessoa.findUnique({
      where: { id },
      include: { conhecimentos: true },
    });

    if (!pessoa) return res.status(404).json({ erro: "Pessoa não encontrada" });

    return res.json(pessoa);
  } catch (err) {
    return next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ erro: "id inválido" });

    const pessoa = await prisma.pessoa.findUnique({
      where: { id },
      include: { _count: { select: { conhecimentos: true } } },
    });

    if (!pessoa) return res.status(404).json({ erro: "Pessoa não encontrada" });

    if (pessoa._count.conhecimentos > 0) {
      return res
        .status(400)
        .json({ erro: "Pessoa possui conhecimentos vinculados" });
    }

    await prisma.pessoa.delete({ where: { id } });
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
});

export default router;