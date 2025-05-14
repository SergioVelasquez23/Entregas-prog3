import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ListPolicyComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';

const routes: Routes = [
  { path: 'list', component: ListPolicyComponent },
  { path: 'create', component: ManageComponent },
  { path: 'update/:id', component: ManageComponent },
  { path: 'view/:id', component: ManageComponent },
];

@NgModule({
  declarations: [
    ListPolicyComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PolicyModule { }