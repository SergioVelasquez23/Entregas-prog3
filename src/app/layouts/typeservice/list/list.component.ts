// typeservice/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { TypeService } from 'src/app/models/type-service.model';
import { TypeServiceService } from 'src/app/services/type-service.service';
// import { Router } from '@angular/router'; // Import Router if you need navigation

@Component({
  selector: 'app-list-type-service',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListTypeServiceComponent implements OnInit {

  typeservices: TypeService[] = []; // Array to store service types

  // Inject the service and Router (if needed)
  constructor(private typeServiceService: TypeServiceService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Call the service to get the list
    this.typeServiceService.list().subscribe(data => {
      this.typeservices = data; // Assign data to the array property
    });
  }

  // Methods for edit and delete (adjust ID type based on your model)
  edit(id: number) {
    console.log('Editing Service Type ID:', id);
    // Implement navigation
  }

  delete(id: number) {
    console.log('Deleting Service Type ID:', id);
    // Implement call to the delete service method
  }
}