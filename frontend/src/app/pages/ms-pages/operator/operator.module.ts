import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListOperatorComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';

const routes: Routes = [
  { path: 'list', component: ListOperatorComponent },
  { path: 'create', component: ManageComponent },
  { path: 'update/:id', component: ManageComponent },
  { path: 'view/:id', component: ManageComponent },
];

@NgModule({
  declarations: [
    ListOperatorComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class OperatorModule { }