import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get("/municipalities_constructions", "MunicipalitiesConstructionsController.find");
  Route.get("/municipalities_constructions/:id", "MunicipalitiesConstructionsController.find");
  Route.post("/municipalities_constructions", "MunicipalitiesConstructionsController.create");
  Route.put("/municipalities_constructions/:id", "MunicipalitiesConstructionsController.update");
  Route.delete("/municipalities_constructions/:id", "MunicipalitiesConstructionsController.delete");
});