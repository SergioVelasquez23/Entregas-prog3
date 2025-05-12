import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListServiceComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceRoutingModule } from './service-routing.module';

const routes: Routes = [

];

@NgModule({
  declarations:[
    ListServiceComponent,
    ManageComponent

  ],
  imports:[CommonModule, FormsModule, ServiceRoutingModule]
})
export class ServiceModule {}