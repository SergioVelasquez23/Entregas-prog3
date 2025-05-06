import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get("/maintenance", "MaintenanceController.find");
  Route.get("/maintenance/:id", "MaintenanceController.find");
  Route.post("/maintenance", "MaintenanceController.create");
  Route.put("/maintenance/:id", "MaintenanceController.update");
  Route.delete("/maintenance/:id", "MaintenanceController.delete");
});