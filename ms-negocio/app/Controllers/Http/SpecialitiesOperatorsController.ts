import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SpecialityOperator from 'App/Models/SpecialityOperator' // Renamed model alias
import SpecialityOperatorValidator from 'App/Validators/SpecialitiesOperatorValidator' // Renamed validator alias
 // Import Exception for handling not found

export default class SpecialityOperatorsController { // Renamed controller class

  /**
   * List all SpecialityOperator records with optional pagination.
   * Handles GET /speciality_operators
   */
  public async index({ request, response }: HttpContextContract) {
    // Get query parameters for pagination
    const queryData = request.only(['page', 'per_page']);
    const page = queryData.page || 1;
    const perPage = queryData.per_page || 20;

    try {
        if (queryData.page && queryData.per_page) {
            // Return paginated results
            const specialityOperators = await SpecialityOperator.query().paginate(page, perPage);
            return response.ok(specialityOperators);
        } else {
            // Return all results if no pagination requested
            const specialityOperators = await SpecialityOperator.query().exec();
            return response.ok(specialityOperators);
        }
    } catch (error) {
        console.error("Error fetching SpecialityOperators:", error);
        return response.internalServerError({ message: 'An error occurred while fetching records.' });
    }
  }

  /**
   * Show a single SpecialityOperator record by ID.
   * Handles GET /speciality_operators/:id
   */
  public async show({ params, response }: HttpContextContract) {
    try {
      // Find the record by ID or throw a 404 exception
      const specialityOperator = await SpecialityOperator.findOrFail(params.id); // Renamed variable
      return response.ok(specialityOperator);
    } catch (error) {
      // Handle record not found exception
      if (error.code === 'E_ROW_NOT_FOUND') {
          return response.notFound({ message: 'Speciality Operator not found.' });
      }
      console.error(`Error fetching SpecialityOperator with ID ${params.id}:`, error);
      return response.internalServerError({ message: 'An error occurred while fetching the record.' });
    }
  }

  /**
   * Create a new SpecialityOperator record.
   * Handles POST /speciality_operators
   */
  public async store({ request, response }: HttpContextContract) {
    try {
      // Validate the request body using the validator
      const validatedData = await request.validate(SpecialityOperatorValidator); // Renamed variable

      // Create the record with validated data
      const specialityOperator = await SpecialityOperator.create(validatedData); // Renamed variable

      // Return the created record with 201 Created status
      return response.created(specialityOperator); // 201 status

    } catch (error) {
      // Handle validation errors or other creation errors
       if (error.messages) { // Check if it's a validator error object
           console.error("Validation failed:", error.messages);
           return response.badRequest(error.messages);
       }
      console.error("Error creating SpecialityOperator:", error);
      return response.internalServerError({ message: 'An error occurred while creating the record.' });
    }
  }

  /**
   * Update an existing SpecialityOperator record by ID.
   * Handles PUT or PATCH /speciality_operators/:id
   */
  public async update({ params, request, response }: HttpContextContract) {
    try {
      // Find the record by ID
      const specialityOperator = await SpecialityOperator.findOrFail(params.id); // Renamed variable

      // Validate the request body.
      // The validator should be configured to handle partial updates (e.g., using optional or nullable rules)
      // or you might validate only the specific fields you allow updating.
      const validatedData = await request.validate(SpecialityOperatorValidator); // Renamed variable

      // Merge the validated data into the found record
      // This is more flexible than assigning individual properties.
      // Assumes validatedData properties match the model properties (e.g., operator_id, speciality_id, experience_level)
      specialityOperator.merge(validatedData);

      // Original code used explicit assignment (commented out, but shows assumed mapping)
      // specialityOperator.operator_id = validatedData.operator_id; // operator_id was already English
      // specialityOperator.speciality_id = validatedData.speciality_id; // Translated from especialidad_id
      // specialityOperator.experience_level = validatedData.experience_level; // Translated from nivel_experiencia


      // Save the updated record
      await specialityOperator.save();

      // Return the updated record
      return response.ok(specialityOperator);

    } catch (error) {
      // Handle record not found or validation errors
      if (error.code === 'E_ROW_NOT_FOUND') {
           return response.notFound({ message: 'Speciality Operator not found.' });
      }
      if (error.messages) { // Check if it's a validator error object
           console.error("Validation failed:", error.messages);
           return response.badRequest(error.messages);
      }
      console.error(`Error updating SpecialityOperator with ID ${params.id}:`, error);
      return response.internalServerError({ message: 'An error occurred while updating the record.' });
    }
  }

  /**
   * Delete a SpecialityOperator record by ID.
   * Handles DELETE /speciality_operators/:id
   */
  public async destroy({ params, response }: HttpContextContract) {
    try {
      // Find the record by ID
      const specialityOperator = await SpecialityOperator.findOrFail(params.id); // Renamed variable

      // Delete the record
      await specialityOperator.delete();

      // Return a 204 No Content status for successful deletion
      return response.noContent(); // 204 status

    } catch (error) {
      // Handle record not found exception
      if (error.code === 'E_ROW_NOT_FOUND') {
          return response.notFound({ message: 'Speciality Operator not found.' });
      }
      console.error(`Error deleting SpecialityOperator with ID ${params.id}:`, error);
      return response.internalServerError({ message: 'An error occurred while deleting the record.' });
    }
  }

}