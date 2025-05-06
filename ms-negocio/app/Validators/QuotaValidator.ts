import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class QuotaValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "presence", and "text content" of the HTTP request body.
   *
   * For more information on schema validation know more on the docs:
   * https://docs.adonisjs.com/guides/validator/schema
   */
  public schema = schema.create({
    // service_id: Must be a required number, unsigned, and exist in the 'services' table
    service_id: schema.number([
      rules.required(),
      rules.unsigned(),
      rules.exists({ table: 'services', column: 'id' }),
    ]),

    // quantity: Must be a required number, likely an integer, and greater than 0
    quantity: schema.number([
      rules.required(), // Assuming quantity must be positive
    ]),

    // email: Must be a required string, a valid email format, with a max length
    email: schema.string([
      rules.required(),
      rules.email(),
      rules.maxLength(255),
    ]),

    // client_name: Must be a required string with a max length
    client_name: schema.string([
      rules.required(),
      rules.maxLength(255),
    ]),

    // payment_reference: Must be a required string, unique in the 'quotas' table, with a max length
    payment_reference: schema.string([
      rules.required(),
      rules.maxLength(255),
      // Rule to ensure the payment_reference is unique in the 'quotas' table
      rules.unique({ table: 'quotas', column: 'payment_reference' }),
    ]),

    // expiration_date: Must be a required date.
    // The {} allows passing options like format, e.g., { format: 'yyyy-MM-dd' }
    expiration_date: schema.date({}, [
      rules.required(),
      // Optional: Add a rule to ensure the expiration date is in the future
      // rules.after('today', 'date')
    ]),

    // paid: Must be a required boolean
    paid: schema.boolean([
      rules.required(),
    ]),

    // Note: id, createdAt, updatedAt are typically not included in the request body
    // and are handled by the database or backend logic.
  })

  /**
   * Custom messages for validation failures. You can define specific messages
   * for each rule and field.
   *
   * For more information on custom messages know more on the docs:
   * https://docs.adonisjs.com/guides/validator/messages
   */
  public messages: CustomMessages = {
    'required': 'The {{ field }} is required.',
    'email.email': 'The {{ field }} must be a valid email address.',
    'unique': 'The {{ field }} has already been taken.',
    'exists': 'The selected {{ field }} does not exist.',
    'number.integer': 'The {{ field }} must be an integer.',
    'number.greaterThan': 'The {{ field }} must be greater than {{ options.greaterThan }}.',
    'maxLength': 'The {{ field }} cannot exceed {{ options.maxLength }} characters.',
    // Add more specific messages if needed, e.g.:
    // 'service_id.exists': 'The selected service does not exist.',
  }

  /**
   * Optional: Rule to make all fields optional. Useful for UPDATE requests.
   * You can override the schema for specific contexts (like update)
   * by defining a `schema` getter that returns a modified schema.
   * See docs for "Validation Contexts".
   */
  // public get schema() {
  //   if (this.ctx.request.method() === 'PUT') { // Example: For PUT requests
  //     return schema.create({
  //       service_id: schema.number.nullableAndOptional([
  //         rules.unsigned(),
  //         rules.exists({ table: 'services', column: 'id' }),
  //       ]),
  //       quantity: schema.number.nullableAndOptional([
  //         rules.integer(),
  //         rules.greaterThan(0),
  //       ]),
  //       email: schema.string.nullableAndOptional([
  //         rules.email(),
  //         rules.maxLength(255),
  //       ]),
  //       // ... make other fields nullableAndOptional as needed for update
  //       paid: schema.boolean.nullableAndOptional(),
  //     });
  //   }
  //   // Default schema for POST (Create)
  //   return schema.create({ /* ... your required fields schema */ });
  // }
}