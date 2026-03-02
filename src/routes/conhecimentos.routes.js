import { Router } from "express";
import prisma from "../prisma.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const { tituloConhecimento, descricao, nivel, userId } = req.body;

    const conhecimento = await prisma.conhecimento.create({
      data: {
        tituloConhecimento,
        descricao,
        nivel,
        userId,
      },
    });

    return res.status(201).json(conhecimento);
  } catch (err) {
    return next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const conhecimentos = await prisma.conhecimento.findMany({
      include: { user: true },
    });

    return res.json(conhecimentos);
  } catch (err) {
    return next(err);
  }
});

export default router;