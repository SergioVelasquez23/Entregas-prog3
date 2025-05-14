// procedure/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { Procedure } from 'src/app/models/procedure.model';
import { ProcedureService } from 'src/app/services/procedureService/procedure.service';
// import { Router } from '@angular/router'; // Import Router if you need navigation

@Component({
  selector: 'app-list-procedure',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListProcedureComponent implements OnInit {

  procedures: Procedure[] = []; // Array to store procedures

  // Inject the service and Router (if needed)
  constructor(private procedureService: ProcedureService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Call the service to get the list
    this.procedureService.list().subscribe(data => {
      this.procedures = data; // Assign data to the array property
    });
  }

  // Methods for edit and delete (adjust ID type based on your model)
  edit(id: number) {
    console.log('Editing Procedure ID:', id);
    // Implement navigation
  }

  delete(id: number) {
    console.log('Deleting Procedure ID:', id);
    // Implement call to the delete service method
  }
}