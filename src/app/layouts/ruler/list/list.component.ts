// ruler/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { Ruler } from 'src/app/models/ruler.model';
import { RulerService } from 'src/app/services/ruler.service';
// import { Router } from '@angular/router'; // Import Router if you need navigation

@Component({
  selector: 'app-list-ruler',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListRulerComponent implements OnInit {

  rulers: Ruler[] = []; // Array to store rulers

  // Inject the service and Router (if needed)
  constructor(private rulerService: RulerService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Call the service to get the list
    this.rulerService.list().subscribe(data => {
      this.rulers = data; // Assign data to the array property
    });
  }

  // Methods for edit and delete (adjust ID type based on your model)
  edit(id: number) {
    console.log('Editing Ruler ID:', id);
    // Implement navigation
  }

  delete(id: number) {
    console.log('Deleting Ruler ID:', id);
    // Implement call to the delete service method
  }
}