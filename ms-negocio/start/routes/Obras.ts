import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get("/constructions", "ConstructionsController.find");
  Route.get("/constructions/:id", "ConstructionsController.find");
  Route.post("/constructions", "ConstructionsController.create");
  Route.put("/constructions/:id", "ConstructionsController.update");
  Route.delete("/constructions/:id", "ConstructionsController.delete");
});