import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import colombiaData from 'App/data/colombia.json';// Ruta relativa directaa corregida según tu estructura

export default class DepartamentosController {
  public async departamentos({ response }: HttpContextContract) {
    try {
      return response.json(colombiaData); // Devuelve todo el arreglo de departamentos
    } catch (error) {
      console.error("Error fetching departamentos:", error);
      return response.status(500).json({ error: "Error al obtener departamentos" });
    }
  }

  public async municipios({ params, response }: HttpContextContract) {
    try {
      const departamentoNombre = params.departamento;
      if (!departamentoNombre) {
        return response.status(400).json({ error: "Nombre de departamento requerido" });
      }

      const departamento = colombiaData.find(
        (dep) => dep.departamento.toLowerCase() === departamentoNombre.toLowerCase()
      );

      if (departamento) {
        return response.json(departamento.ciudades);
      }

      return response.status(404).json({ message: 'Departamento no encontrado' });
    } catch (error) {
      console.error("Error fetching municipios:", error);
      return response.status(500).json({ error: "Error al obtener municipios" });
    }
  }
}