import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get("/maintenance_procedure", "MaintenanceProcedureController.find");
  Route.get("/maintenance_procedure/:id", "MaintenanceProcedureController.find");
  Route.post("/maintenance_procedure", "MaintenanceProcedureController.create");
  Route.put("/maintenance_procedure/:id", "MaintenanceProcedureController.update");
  Route.delete("/maintenance_procedure/:id", "MaintenanceProcedureController.delete");
});