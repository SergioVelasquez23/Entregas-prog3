// municipalityconstruction/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { MunicipalityConstruction } from 'src/app/models/municipality-construction.model';
import { MunicipalityConstructionService } from 'src/app/services/municipality-construction.service';
// import { Router } from '@angular/router'; // Import Router if you need navigation

@Component({
  selector: 'app-list-municipality-construction',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListMunicipalityConstructionComponent implements OnInit {

  municipalityConstructions: MunicipalityConstruction[] = []; // Array to store links

  // Inject the service and Router (if needed)
  constructor(private municipalityConstructionService: MunicipalityConstructionService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Call the service to get the list
    this.municipalityConstructionService.list().subscribe(data => {
      this.municipalityConstructions = data; // Assign data to the array property
    });
  }

  // Methods for edit and delete (adjust ID type based on your model)
  edit(id: number) {
    console.log('Editing Municipality-Construction Link ID:', id);
    // Implement navigation
  }

  delete(id: number) {
    console.log('Deleting Municipality-Construction Link ID:', id);
    // Implement call to the delete service method
  }
}