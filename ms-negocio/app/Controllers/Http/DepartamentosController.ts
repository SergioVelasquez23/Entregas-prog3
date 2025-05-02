import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class DepartamentosController {
  // Datos estáticos de departamentos y municipios
  private static colombiaData = [
    {
      departamento: 'Antioquia',
      ciudades: ['Medellín', 'Envigado', 'Itagüí', 'Bello'],
    },
    {
      departamento: 'Cundinamarca',
      ciudades: ['Bogotá', 'Soacha', 'Chía', 'Zipaquirá'],
    },
    {
      departamento: 'Valle del Cauca',
      ciudades: ['Cali', 'Palmira', 'Buenaventura', 'Tuluá'],
    },
    // Agrega más departamentos y ciudades según sea necesario
  ];

  public async departamentos({ response }: HttpContextContract) {
    try {
      // Devuelve todos los departamentos
      return response.json(DepartamentosController.colombiaData);
    } catch (error) {
      console.error('Error fetching departamentos:', error);
      return response.status(500).json({ error: 'Error al obtener departamentos' });
    }
  }

  public async municipios({ params, response }: HttpContextContract) {
    try {
      const departamentoNombre = params.departamento;
      if (!departamentoNombre) {
        return response.status(400).json({ error: 'Nombre de departamento requerido' });
      }

      // Busca el departamento por nombre
      const departamento = DepartamentosController.colombiaData.find(
        (dep) => dep.departamento.toLowerCase() === departamentoNombre.toLowerCase()
      );

      if (departamento) {
        // Devuelve las ciudades del departamento encontrado
        return response.json(departamento.ciudades);
      } return response.status(500).json({ error: 'Error al obtener municipios' }); console.error('Error fetching municipios:', error);
    } catch (error) {
      return response.status(404).json({ message: 'Departamento no encontrado' }); return response.status(404).json({ message: 'Departamento no encontrado' });
    } catch (error) {
      console.error('Error fetching municipios:', error);
      return response.status(500).json({ error: 'Error al obtener municipios' });
    }
  }
}