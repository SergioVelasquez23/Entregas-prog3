import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get("/spare_maintenance_procedure", "SpareMaintenanceProcedureController.find");
  Route.get("/spare_maintenance_procedure/:id", "SpareMaintenanceProcedureController.find");
  Route.post("/spare_maintenance_procedure", "SpareMaintenanceProcedureController.create");
  Route.put("/spare_maintenance_procedure/:id", "SpareMaintenanceProcedureController.update");
  Route.delete("/spare_maintenance_procedure/:id", "SpareMaintenanceProcedureController.delete");
})