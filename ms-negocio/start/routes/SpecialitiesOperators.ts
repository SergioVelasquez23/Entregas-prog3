import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get("/specialities_operator", "SpecialitiesOperatorController.find");
  Route.get("/specialities_operator/:id", "SpecialitiesOperatorController.find");
  Route.post("/specialities_operator", "SpecialitiesOperatorController.create");
  Route.put("/specialities_operator/:id", "SpecialitiesOperatorController.update");
  Route.delete("/specialities_operator/:id", "SpecialitiesOperatorController.delete");
});