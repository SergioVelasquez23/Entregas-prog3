import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/repuestoProcedimientoMantenimiento", "RepuestoProcedimientoMantenimientoController.find");
    Route.get("/repuestoProcedimientoMantenimiento/:id", "RepuestoProcedimientoMantenimientoController.find");
    Route.post("/repuestoProcedimientoMantenimiento", "RepuestoProcedimientoMantenimientoController.create");
    Route.put("/repuestoProcedimientoMantenimiento/:id", "RepuestoProcedimientoMantenimientoController.update");
    Route.delete("/repuestoProcedimientoMantenimiento/:id", "RepuestoProcedimientoMantenimientoController.delete");
})