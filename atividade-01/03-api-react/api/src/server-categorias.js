// COLE este trecho no server.js existente,
// depois dos imports e antes do app.listen(...).

import { categorias } from "./categorias.js";

// Lista todas as categorias
app.get("/api/categorias", (req, res) => {
  res.json(categorias);
});

// Mostra uma categoria pelo id e seus produtos
app.get("/api/categorias/:id", (req, res) => {
  const id = Number(req.params.id);

  const categoria = categorias.find((c) => c.id === id);

  if (!categoria) {
    return res.status(404).json({
      error: "Categoria não encontrada"
    });
  }

  const produtosDaCategoria = produtos.filter(
    (p) => p.categoria === categoria.nome
  );

  res.json({
    ...categoria,
    produtos: produtosDaCategoria
  });
});
