// novelty/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { Novelty } from 'src/app/models/novelty.model';
import { NoveltyService } from 'src/app/services/noveltyService/novelty.service';
// import { Router } from '@angular/router'; // Import Router if you need navigation

@Component({
  selector: 'app-list-novelty',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListNoveltyComponent implements OnInit {

  novelties: Novelty[] = []; // Array to store novelties

  // Inject the service and Router (if needed)
  constructor(private noveltyService: NoveltyService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Call the service to get the list
    this.noveltyService.list().subscribe(data => {
      this.novelties = data; // Assign data to the array property
    });
  }

  // Methods for edit and delete (adjust ID type based on your model)
  edit(id: number) {
    console.log('Editing Novelty ID:', id);
    // Implement navigation
  }

  delete(id: number) {
    console.log('Deleting Novelty ID:', id);
    // Implement call to the delete service method
  }
}