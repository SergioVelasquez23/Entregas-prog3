// municipalityruler/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { MunicipalityRuler } from 'src/app/models/municipality-ruler.model';
import { MunicipalityRulerService } from 'src/app/services/municipality-ruler.service';
// import { Router } from '@angular/router'; // Import Router if you need navigation

@Component({
  selector: 'app-list-municipality-ruler',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListMunicipalityRulerComponent implements OnInit {

  municipalityRulers: MunicipalityRuler[] = []; // Array to store links

  // Inject the service and Router (if needed)
  constructor(private municipalityRulerService: MunicipalityRulerService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Call the service to get the list
    this.municipalityRulerService.list().subscribe(data => {
      this.municipalityRulers = data; // Assign data to the array property
    });
  }

  // Methods for edit and delete (adjust ID type based on your model)
  edit(id: number) {
    console.log('Editing Municipality-Ruler Link ID:', id);
    // Implement navigation
  }

  delete(id: number) {
    console.log('Deleting Municipality-Ruler Link ID:', id);
    // Implement call to the delete service method
  }
}