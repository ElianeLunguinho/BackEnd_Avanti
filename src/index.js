import express from "express";
import pessoasRoutes from "./routes/pessoas.routes.js";
import conhecimentosRoutes from "./routes/conhecimentos.routes.js";

const app = express();
app.use(express.json());

app.use("/pessoas", pessoasRoutes);
app.use("/conhecimentos", conhecimentosRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  return res.status(500).json({ erro: "Erro interno do servidor" });
});

app.listen(8080, () => {
  console.log("Running on port 8080");
});