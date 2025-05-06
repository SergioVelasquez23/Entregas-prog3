import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get("/specialities", "SpecialitiesController.find");
  Route.get("/specialities/:id", "SpecialitiesController.find");
  Route.post("/specialities", "SpecialitiesController.create");
  Route.put("/specialities/:id", "SpecialitiesController.update");
  Route.delete("/specialities/:id", "SpecialitiesController.delete");
});