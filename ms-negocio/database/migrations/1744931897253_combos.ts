import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "combos";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table
        .integer("id_servicio")
        .unsigned()
        .references("id")
        .inTable("servicios")
        .onDelete("CASCADE");
        table.timestamp('created_at', { useTz: true }).defaultTo(this.now());
        table.timestamp('updated_at', { useTz: true }).defaultTo(this.now());
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
