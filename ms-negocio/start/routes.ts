/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

import './routes/Machinery'
import './routes/Messages'
import './routes/Departments'
import './routes/Rulers'
import './routes/Chats'
import './routes/Messages'
import './routes/Services'
import './routes/Shifts'
import './routes/TypeServices'
import './routes/Chats'
import './routes/Combos'
import './routes/Quotas'
import './routes/MachinerySpeciality'
import './routes/Specialities'
import './routes/Evidences'
import './routes/Bills'
import './routes/GPS'
import './routes/Maintenances'
import './routes/Municipitalities'
import './routes/Constructions'
import './routes/MunicipalitiesConstructions'
import './routes/Policies'
import './routes/MaintenancesProcedures'
import './routes/Procedures'
import './routes/Operators'
import './routes/SpecialitiesOperators'
import './routes/CombosMachineries'
import './routes/DepartmentRulers'
import './routes/MunicipalitiesRuler'
