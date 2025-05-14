import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'tables', component: TablesComponent },
  { path: 'icons', component: IconsComponent },
  { path: 'maps', component: MapsComponent },
  {
    path: 'theaters',
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/ms-pages/theaters/theaters.module').then(m => m.TheatersModule)
      }
    ]
  },

  {
    path: 'factura',
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/ms-pages/bill/bill.module').then(m => m.FacturaModule)
      }
    ]
  },
  {
    path: 'chats',
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/ms-pages/chats/chats.module').then(m => m.ChatsRoutingModule)
      }
    ]
  },
  {
    path: 'combomachinery',
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/ms-pages/combomachinery/combomachinery.module').then(m => m.ComboMachineryRoutingModule)
      }
    ]
  },
  {
    path: 'combos',
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/ms-pages/combos/combos.module').then(m => m.CombosRoutingModule)
      }
    ]
  },
  {
    path: 'construction',
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/ms-pages/construction/construction.module').then(m => m.ConstructionRoutingModule)
      }
    ]
  },
  {
    path: 'departmentruler',
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/ms-pages/departmentruler/departmentruler.module').then(m => m.DepartmentRulerRoutingModule)
      }
    ]
  },
  {
    path: 'evidence',
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/ms-pages/evidence/evidence.module').then(m => m.EvidenceRoutingModule)
      }
    ]
  },
  {
    path: 'gps',
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/ms-pages/gps/gps.module').then(m => m.GpsRoutingModule)
      }
    ]
  },
  {
    path: 'insurance',
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/ms-pages/insurance/insurance.module').then(m => m.InsuranceRoutingModule)
      }
    ]
  },
  {
    path: 'machinery',
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/ms-pages/machinery/machinery.module').then(m => m.MachineryRoutingModule)
      }
    ]
  },
  {
    path: 'machineryspeciality',
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/ms-pages/machineryspeciality/machineryspeciality.module').then(m => m.MachinerySpecialtyRoutingModule)
      }
    ]
  },
  {
    path: 'maintenance',
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/ms-pages/maintenance/maintenance.module').then(m => m.MaintenanceRoutingModule)
      }
    ]
  },
  {
    path: 'maintenanceprocedure',
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/ms-pages/maintenanceprocedure/maintenanceprocedure.module').then(m => m.MaintenanceProcedureRoutingModule)
      }
    ]
  },
  {
    path: 'message',
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/ms-pages/message/message.module').then(m => m.MessageRoutingModule)
      }
    ]
  },
  {
    path: 'municipalityconstruction',
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/ms-pages/municipalityconstruction/municipalityconstruction.module').then(m => m.MunicipalityConstructionRoutingModule)
      }
    ]
  },
  {
    path: 'municipalityruler',
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/ms-pages/municipalityruler/municipalityruler.module').then(m => m.MunicipalityRulerRoutingModule)
      }
    ]
  },
  {
    path: 'novelty',
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/ms-pages/novelty/novelty.module').then(m => m.NoveltyRoutingModule)
      }
    ]
  },
  {
    path: 'operario',
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/ms-pages/operator/operator.module').then(m => m.OperatorModule)
      }
    ]
  },
  {
    path: 'poliza',
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/ms-pages/policy/policy.module').then(m => m.PolicyModule)
      }
    ]
  },
  {
    path: 'procedure',
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/ms-pages/procedure/procedure.module').then(m => m.ProcedureRoutingModule)
      }
    ]
  },
  {
    path: 'quotas',
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/ms-pages/quotas/quotas.module').then(m => m.QuotasRoutingModule)
      }
    ]
  },
  {
    path: 'ruler',
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/ms-pages/ruler/ruler.module').then(m => m.RulerRoutingModule)
      }
    ]
  },
  {
    path: 'service',
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/ms-pages/service/service.module').then(m => m.ServiceModule)
      }
    ]
  },
  {
    path: 'shift',
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/ms-pages/shift/shift.module').then(m => m.ShiftRoutingModule)
      }
    ]
  },
  {
    path: 'spare',
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/ms-pages/spare/spare.module').then(m => m.SpareRoutingModule)
      }
    ]
  },
  {
    path: 'specialityoperator',
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/ms-pages/specialityoperator/specialityoperator.module').then(m => m.SpecialityOperatorRoutingModule)
      }
    ]
  },
  {
    path: 'specialities',
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/ms-pages/specialities/specialities.module').then(m => m.Speciality)
      }
    ]
  }

];

