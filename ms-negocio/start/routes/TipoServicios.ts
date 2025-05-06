import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get("/type_services", "TypeServicesController.find");
  Route.get("/type_services/:id", "TypeServicesController.find");
  Route.post("/type_services", "TypeServicesController.create");
  Route.put("/type_services/:id", "TypeServicesController.update");
  Route.delete("/type_services/:id", "TypeServicesController.delete");
});