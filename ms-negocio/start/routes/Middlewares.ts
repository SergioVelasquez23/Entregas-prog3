import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post('/test-security', async ({ response }) => {
        return response.status(200).json({ success: true, message: 'Seguridad validada' })
      }).middleware('MsSecMid')
      
      Route.post('/api/payment/charge', async ({ response }) => {
        return response.status(200).json({ success: true, message: 'Pago procesado' })
      }).middleware('MsPayMid')
      
      Route.post('/test-notifications', async ({ response }) => {
        return response.status(200).json({ success: true, message: 'Notificación enviada' })
      }).middleware('MsNotMid')
})
