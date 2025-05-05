import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    {
        path: 'theaters',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/layouts/theaters/theaters.module').then(m => m.TheatersModule)
          }
        ]
      },

      {
        path: 'bill',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/layouts/bill/bill.module').then(m => m.BillModule)
          }
        ]
      },
      {
        path: 'chats',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/layouts/chats/chats.module').then(m => m.ChatsModule)
          }
        ]
      },
      {
        path: 'combomachinery',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/layouts/combomachinery/combomachinery.module').then(m => m.CombomachineryModule)
          }
        ]
      },
      {
        path: 'combos',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/layouts/combos/combos.module').then(m => m.CombosModule)
          }
        ]
      },
      {
        path: 'construction',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/layouts/construction/construction.module').then(m => m.ConstructionModule)
          }
        ]
      },
      {
        path: 'departmentruler',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/layouts/departmentruler/departmentruler.module').then(m => m.DepartmentrulerModule)
          }
        ]
      },
      {
        path: 'evidence',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/layouts/evidence/evidence.module').then(m => m.EvidenceModule)
          }
        ]
      },
      {
        path: 'gps',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/layouts/gps/gps.module').then(m => m.GpsModule)
          }
        ]
      },
      {
        path: 'insurance',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/layouts/insurance/insurance.module').then(m => m.InsuranceModule)
          }
        ]
      },
      {
        path: 'machinery',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/layouts/machinery/machinery.module').then(m => m.MachineryModule)
          }
        ]
      },
      {
        path: 'machineryspeciality',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/layouts/machineryspeciality/machineryspeciality.module').then(m => m.MachineryspecialityModule)
          }
        ]
      },
      {
        path: 'maintenance',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/layouts/maintenance/maintenance.module').then(m => m.MaintenanceModule)
          }
        ]
      },
      {
        path: 'maintenanceprocedure',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/layouts/maintenanceprocedure/maintenanceprocedure.module').then(m => m.MaintenanceprocedureModule)
          }
        ]
      },
      {
        path: 'message',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/layouts/message/message.module').then(m => m.MessageModule)
          }
        ]
      },
      {
        path: 'municipalityconstruction',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/layouts/municipalityconstruction/municipalityconstruction.module').then(m => m.MunicipalityconstructionModule)
          }
        ]
      },
      {
        path: 'municipalityruler',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/layouts/municipalityruler/municipalityruler.module').then(m => m.MunicipalityrulerModule)
          }
        ]
      },
      {
        path: 'novelty',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/layouts/novelty/novelty.module').then(m => m.NoveltyModule)
          }
        ]
      },
      {
        path: 'operator',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/layouts/operator/operator.module').then(m => m.OperatorModule)
          }
        ]
      },
      {
        path: 'policy',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/layouts/policy/policy.module').then(m => m.PolicyModule)
          }
        ]
      },
      {
        path: 'procedure',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/layouts/procedure/procedure.module').then(m => m.ProcedureModule)
          }
        ]
      },
      {
        path: 'quotas',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/layouts/quotas/quotas.module').then(m => m.QuotasModule)
          }
        ]
      },
      {
        path: 'ruler',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/layouts/ruler/ruler.module').then(m => m.RulerModule)
          }
        ]
      },
      {
        path: 'service',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/layouts/service/service.module').then(m => m.ServiceModule)
          }
        ]
      },
      {
        path: 'shift',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/layouts/shift/shift.module').then(m => m.ShiftModule)
          }
        ]
      },
      {
        path: 'spare',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/layouts/spare/spare.module').then(m => m.SpareModule)
          }
        ]
      },
      {
        path: 'specialityoperator',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/layouts/specialityoperator/specialityoperator.module').then(m => m.SpecialityoperatorModule)
          }
        ]
      },
      {
        path: 'specialities',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/layouts/specialities/specialities.module').then(m => m.SpecialitiesModule)
          }
        ]
      }
    
];

