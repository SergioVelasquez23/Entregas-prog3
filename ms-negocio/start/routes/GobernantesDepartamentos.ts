import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get("/departments_rulers", "DepartmentsRulersController.find");
  Route.get("/departments_rulers/:id", "DepartmentsRulersController.find");
  Route.post("/departments_rulers", "DepartmentsRulersController.create");
  Route.put("/departments_rulers/:id", "DepartmentsRulersController.update");
  Route.delete("/departments_rulers/:id", "DepartmentsRulersController.delete");
});