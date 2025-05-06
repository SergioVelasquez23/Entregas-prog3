import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get("/municipalities_rulers", "MunicipalitiesRulersController.find");
  Route.get("/municipalities_rulers/:id", "MunicipalitiesRulersController.find");
  Route.post("/municipalities_rulers", "MunicipalitiesRulersController.create");
  Route.put("/municipalities_rulers/:id", "MunicipalitiesRulersController.update");
  Route.delete("/municipalities_rulers/:id", "MunicipalitiesRulersController.delete");
});