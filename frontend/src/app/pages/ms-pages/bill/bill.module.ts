import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BillRoutingModule } from './bill-routing.module';
import { ListFacturaComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';

@NgModule({
  declarations: [
    ListFacturaComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BillRoutingModule
  ]
})
export class FacturaModule { }