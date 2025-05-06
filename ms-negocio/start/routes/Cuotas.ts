import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get("/quotas", "QuotasController.find");
  Route.get("/quotas/:id", "QuotasController.find");
  Route.post("/quotas", "QuotasController.create");
  Route.put("/quotas/:id", "QuotasController.update");
  Route.delete("/quotas/:id", "QuotasController.delete");
  Route.post("/quotas/:id/pay", "QuotasController.pay");
});