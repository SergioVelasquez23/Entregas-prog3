import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get("/combos_machineries", "CombosMachineriesController.find");
  Route.get("/combos_machineries/:id", "CombosMachineriesController.find");
  Route.post("/combos_machineries", "CombosMachineriesController.create");
  Route.put("/combos_machineries/:id", "CombosMachineriesController.update");
  Route.delete("/combos_machineries/:id", "CombosMachineriesController.delete");
});