import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get("/specialty_machinery", "SpecialtyMachineryController.find");
  Route.get("/specialty_machinery/:id", "SpecialtyMachineryController.find");
  Route.post("/specialty_machinery", "SpecialtyMachineryController.create");
  Route.put("/specialty_machinery/:id", "SpecialtyMachineryController.update");
  Route.delete("/specialty_machinery/:id", "SpecialtyMachineryController.delete");
});