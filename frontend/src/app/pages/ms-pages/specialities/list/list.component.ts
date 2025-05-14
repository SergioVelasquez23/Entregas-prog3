// specialities/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { Speciality } from 'src/app/models/speciality.model';
import { SpecialitiesService } from 'src/app/services/specialitiesService/specialities.service';
// import { Router } from '@angular/router'; // Import Router if you need navigation

@Component({
  selector: 'app-list-speciality',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListSpecialityComponent implements OnInit {

  specialities: Speciality[] = []; // Array to store specialities

  // Inject the service and Router (if needed)
  constructor(private specialitiesService: SpecialitiesService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Call the service to get the list
    this.specialitiesService.list().subscribe(data => {
      this.specialities = data; // Assign data to the array property
    });
  }

  // Methods for edit and delete (adjust ID type based on your model)
  edit(id: number) {
    console.log('Editing Speciality ID:', id);
    // Implement navigation
  }

  delete(id: number) {
    console.log('Deleting Speciality ID:', id);
    // Implement call to the delete service method
  }
}