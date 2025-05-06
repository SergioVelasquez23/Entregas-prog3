import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class SpareMaintenanceProcedureValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    // name: Must be a required string with a max length
    // NOTE: Removed the unique rule here as it seems out of place for a pivot table column named 'name'.
    // If a name needs to be unique, it's likely the name of the Procedure or Spare, not the pivot record itself.
    name: schema.string([
      rules.required(),
      rules.maxLength(255), // Common max length for string columns
    ]),

    // description: Must be a required string with min/max length
    description: schema.string([
      rules.required(),
      rules.minLength(10),
      rules.maxLength(500),
    ]),

    // price: Must be a required number, unsigned, and within a range
    price: schema.number([
      rules.required(),
      rules.unsigned(), // Ensures positive or zero
      rules.range(0.01, 1000000), // Range between 0.01 and 1,000,000
    ]),

    // spare_id: Must be a required number, unsigned, and exist in the 'spares' table.
    // IMPORTANT: Changed from schema.array() to schema.number() to match your model definition.
    spare_id: schema.number([
      rules.required(),
      rules.unsigned(),
      rules.exists({ table: 'spares', column: 'id' }), // Verify the ID exists in the 'spares' table
    ]),

    // procedure_id: Must be a required number, unsigned, and exist in the 'maintenances_procedures' table.
    // IMPORTANT: This column is CRITICAL for this to function as a pivot linking Spare to MaintenanceProcedure,
    // but it is MISSING from your SpareMaintenanceProcedure model definition.
    // You MUST add 'public procedure_id: number' to your model.
    procedure_id: schema.number([
      rules.required(),
      rules.unsigned(),
      rules.exists({ table: 'maintenances_procedures', column: 'id' }), // Verify the ID exists in the pivot table for MaintenanceProcedure
    ]),

    // Note: id, createdAt, updatedAt are typically not included in the request body
    // and are handled by the database or backend logic.
  });

  public messages: CustomMessages = {
    '{{ field }}.required': 'The {{ field }} is required.',
    '{{ field }}.maxLength': 'The {{ field }} cannot exceed {{ options.maxLength }} characters.',
    '{{ field }}.minLength': 'The {{ field }} must have at least {{ options.minLength }} characters.',
    '{{ field }}.email': 'The {{ field }} must be a valid email address.',
    '{{ field }}.unique': 'The {{ field }} has already been taken.',
    '{{ field }}.exists': 'The selected {{ field }} does not exist.',
    '{{ field }}.number': 'The {{ field }} must be a number.',
    '{{ field }}.integer': 'The {{ field }} must be an integer.',
    '{{ field }}.unsigned': 'The {{ field }} must be a positive value.',
    '{{ field }}.range': 'The {{ field }} must be between {{ options.range.min }} and {{ options.range.max }}.',
    // Specific messages for foreign keys if needed, e.g.:
    // 'spare_id.exists': 'The selected spare does not exist.',
    // 'procedure_id.exists': 'The selected maintenance procedure does not exist.',
  };
}