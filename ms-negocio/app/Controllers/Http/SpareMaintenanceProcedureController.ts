import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

// Import the English model name
import SpareMaintenanceProcedure from "App/Models/SpareMaintenanceProcedure";
// Import the validator (you need to create this file: node ace make:validator SpareMaintenanceProcedure)
import SpareMaintenanceProcedureValidator from 'App/Validators/SpareMaintenanceProcedureValidator';
// Import NotFoundException for more specific error handling in 'show', 'update', 'destroy'


// Renamed controller class to English and pluralized
export default class SpareMaintenanceProceduresController {

    /**
     * List all SpareMaintenanceProcedure records with optional pagination.
     * Handles GET /spare_maintenance_procedures
     */
    public async index({ request, response }: HttpContextContract) {
        // Get query parameters for pagination
        const queryData = request.only(['page', 'per_page']);
        const page = queryData.page || 1;
        const perPage = queryData.per_page || 20;

        try {
            if (queryData.page && queryData.per_page) {
                // Return paginated results
                const spareMaintenanceProcedures = await SpareMaintenanceProcedure.query().paginate(page, perPage);
                return response.ok(spareMaintenanceProcedures);
            } else {
                // Return all results if no pagination requested
                const spareMaintenanceProcedures = await SpareMaintenanceProcedure.query().exec();
                return response.ok(spareMaintenanceProcedures);
            }
        } catch (error) {
            console.error("Error fetching SpareMaintenanceProcedures:", error);
            return response.internalServerError({ message: 'An error occurred while fetching records.' });
        }
    }

    /**
     * Show a single SpareMaintenanceProcedure record by ID.
     * Handles GET /spare_maintenance_procedures/:id
     */
    public async show({ params, response }: HttpContextContract) {
        try {
            // Find the record by ID or throw a 404 exception
            const spareMaintenanceProcedure = await SpareMaintenanceProcedure.findOrFail(params.id);
            return response.ok(spareMaintenanceProcedure);
        } catch (error) {
            // Handle record not found exception
            if (error.code === 'E_ROW_NOT_FOUND') {
                return response.notFound({ message: 'Spare Maintenance Procedure not found.' });
            }
            console.error(`Error fetching SpareMaintenanceProcedure with ID ${params.id}:`, error);
            return response.internalServerError({ message: 'An error occurred while fetching the record.' });
        }
    }

    /**
     * Create a new SpareMaintenanceProcedure record.
     * Handles POST /spare_maintenance_procedures
     */
    public async store({ request, response }: HttpContextContract) {
        try {
            // Validate the request body using the validator
            const validatedData = await request.validate(SpareMaintenanceProcedureValidator);

            // Create the record with validated data
            const spareMaintenanceProcedure = await SpareMaintenanceProcedure.create(validatedData);

            // Return the created record with 201 Created status
            return response.created(spareMaintenanceProcedure);

        } catch (error) {
            // Handle validation errors or other creation errors
             if (error.messages) { // Check if it's a validator error object
                 console.error("Validation failed:", error.messages);
                 return response.badRequest(error.messages);
             }
            console.error("Error creating SpareMaintenanceProcedure:", error);
            return response.internalServerError({ message: 'An error occurred while creating the record.' });
        }
    }

    /**
     * Update an existing SpareMaintenanceProcedure record by ID.
     * Handles PUT or PATCH /spare_maintenance_procedures/:id
     */
    public async update({ params, request, response }: HttpContextContract) {
        try {
            // Find the record by ID
            const spareMaintenanceProcedure = await SpareMaintenanceProcedure.findOrFail(params.id);

            // Validate the request body.
            // The validator should be configured to handle partial updates (e.g., using optional or nullable rules)
            // or you might validate only the specific fields you allow updating.
            const validatedData = await request.validate(SpareMaintenanceProcedureValidator); // Assumes validator supports update context or partial data

            // Merge the validated data into the found record
            // Assuming the request body properties now match the English model properties
            spareMaintenanceProcedure.merge(validatedData);
            // Example direct assignments (less flexible than merge, but mirrors original code logic)
            // spareMaintenanceProcedure.name = validatedData.name;
            // spareMaintenanceProcedure.price = validatedData.price;
            // spareMaintenanceProcedure.description = validatedData.description;
            // spareMaintenanceProcedure.spare_id = validatedData.spare_id;


            // Save the updated record
            await spareMaintenanceProcedure.save();

            // Return the updated record
            return response.ok(spareMaintenanceProcedure);

        } catch (error) {
            // Handle record not found or validation errors
            if (error.code === 'E_ROW_NOT_FOUND') {
                 return response.notFound({ message: 'Spare Maintenance Procedure not found.' });
            }
            if (error.messages) { // Check if it's a validator error object
                 console.error("Validation failed:", error.messages);
                 return response.badRequest(error.messages);
            }
            console.error(`Error updating SpareMaintenanceProcedure with ID ${params.id}:`, error);
            return response.internalServerError({ message: 'An error occurred while updating the record.' });
        }
    }

    /**
     * Delete a SpareMaintenanceProcedure record by ID.
     * Handles DELETE /spare_maintenance_procedures/:id
     */
    public async destroy({ params, response }: HttpContextContract) {
        try {
            // Find the record by ID
            const spareMaintenanceProcedure = await SpareMaintenanceProcedure.findOrFail(params.id);

            // Delete the record
            await spareMaintenanceProcedure.delete();

            // Return a 204 No Content status for successful deletion
            return response.noContent(); // 204 status

        } catch (error) {
            // Handle record not found exception
            if (error.code === 'E_ROW_NOT_FOUND') {
                return response.notFound({ message: 'Spare Maintenance Procedure not found.' });
            }
            console.error(`Error deleting SpareMaintenanceProcedure with ID ${params.id}:`, error);
            return response.internalServerError({ message: 'An error occurred while deleting the record.' });
        }
    }

}