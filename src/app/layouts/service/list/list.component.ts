// service/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/service.model';
import { ServiceService } from 'src/app/services/service.service';
// import { Router } from '@angular/router'; // Import Router if you need navigation

@Component({
  selector: 'app-list-service',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListServiceComponent implements OnInit {

  services: Service[] = []; // Array to store services

  // Inject the service and Router (if needed)
  constructor(private serviceService: ServiceService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Call the service to get the list
    this.serviceService.list().subscribe(data => {
      this.services = data; // Assign data to the array property
    });
  }

  // Methods for edit and delete (adjust ID type based on your model)
  edit(id: number) {
    console.log('Editing Service ID:', id);
    // Implement navigation
  }

  delete(id: number) {
    console.log('Deleting Service ID:', id);
    // Implement call to the delete service method
  }
}