import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get("/machinery_speciality", "MachinerySpecialityController.find");
  Route.get("/machinery_speciality/:id", "MachinerySpecialityController.find");
  Route.post("/machinery_speciality", "MachinerySpecialityController.create");
  Route.put("/machinery_speciality/:id", "MachinerySpecialityController.update");
  Route.delete("/machinery_speciality/:id", "MachinerySpecialityController.delete");
});