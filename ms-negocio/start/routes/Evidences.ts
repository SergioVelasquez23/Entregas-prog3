import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get("/evidence", "EvidenceController.find");
  Route.get("/evidence/:id", "EvidenceController.find");
  Route.post("/evidence", "EvidenceController.create");
  Route.put("/evidence/:id", "EvidenceController.update");
  Route.delete("/evidence/:id", "EvidenceController.delete");
});