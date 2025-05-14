const express = require("express");
const cors = require("cors");
const app = express();
const Departamentos = require("../data/departamentos");
require("dotenv").config();

app.use(express.json());
app.use(cors());

//? Obtener todos los departamentos
app.get("/departamentos", (req, res) => {
  const departamentos = Departamentos.map((d) => ({
    id: d.id,
    nombre: d.departamento,
  }));

  if (departamentos.length === 0) {
    return res
      .status(404)
      .json({ message: "No se encontraron departamentos." });
  }

  res.json(departamentos);
});

//? Obtener todos los municipios o filtrar por departamento
app.get("/municipios", (req, res) => {
  const { departamento } = req.query;

  let municipios = [];
  if (departamento) {
    const dep = Departamentos.find(
      (d) => d.departamento.toLowerCase() === departamento.toLowerCase()
    );
    if (!dep) {
      return res.status(404).json({ message: "Departamento no encontrado." });
    }

    municipios = dep.ciudades.map((ciudad) => ({
      id: `${dep.id}-${ciudad.toLowerCase().replace(/\s+/g, "-")}`,
      nombre: ciudad,
      departamento_id: dep.id,
    }));
  } else {
    municipios = Departamentos.flatMap((d) =>
      d.ciudades.map((ciudad) => ({
        id: `${d.id}-${ciudad.toLowerCase().replace(/\s+/g, "-")}`,
        nombre: ciudad,
        departamento_id: d.id,
      }))
    );
  }

  if (municipios.length === 0) {
    return res.status(404).json({ message: "No se encontraron municipios." });
  }

  res.json(municipios);
});

//? Manejo de rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ error: "Recurso no encontrado", codigo: 404 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
