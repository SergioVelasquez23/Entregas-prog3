import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get("/machineries", "MachineriesController.find");
  Route.get("/machineries/:id", "MachineriesController.find");
  Route.post("/machineries", "MachineriesController.create");
  Route.put("/machineries/:id", "MachineriesController.update");
  Route.delete("/machineries/:id", "MachineriesController.delete");
}).middleware(['MsSecMid'])