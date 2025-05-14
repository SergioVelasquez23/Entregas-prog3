import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TheatersRoutingModule } from './theaters-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { Component, OnInit } from '@angular/core';


// Make sure ListComponent is decorated with @Component in src/app/pages/theaters/list/list.component.ts
// Example:
/*

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  // ...
}
*/

@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    TheatersRoutingModule,
    FormsModule
  ]
})
export class TheatersModule { }
