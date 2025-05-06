import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  // Basic CRUD routes
  Route.get("/rulers", "RulersController.find")
  Route.get("/rulers/:id", "RulersController.find")
  Route.post("/rulers", "RulersController.create")
  Route.put("/rulers/:id", "RulersController.update")
  Route.delete("/rulers/:id", "RulersController.delete")
})
.middleware('MsSecMid')