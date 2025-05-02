import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/cuotas", "CuotasController.find");
    Route.get("/cuotas/:id", "CuotasController.find");
    Route.post("/cuotas", "CuotasController.create");
    Route.put("/cuotas/:id", "CuotasController.update");
    Route.get('/cuotas/:id/payment-details', 'CuotasController.getCuotaForPayment');
    Route.post('/cuotas/:id/pay', 'CuotasController.payCuota').middleware('MsPayMid');
})
