// construction/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { Construction } from 'src/app/models/construction.model';
import { ConstructionService } from 'src/app/services/constructionService/construction.service';
// import { Router } from '@angular/router'; // Import Router if you need navigation

@Component({
  selector: 'app-list-construction',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListConstructionComponent implements OnInit {

  constructions: Construction[] = []; // Array to store constructions

  // Inject the ConstructionService and Router (if needed)
  constructor(private constructionService: ConstructionService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Call the service to get the list of constructions
    this.constructionService.list().subscribe(data => {
      this.constructions = data; // Assign data to the constructions array
    });
  }

  // Methods for edit and delete (adjust ID type based on your Construction model)
  edit(id: number) {
    console.log('Editing Construction ID:', id);
    // Implement navigation, e.g: this.router.navigate(['/admin/construction/edit', id]);
  }

  delete(id: number) {
    console.log('Deleting Construction ID:', id);
    // Implement the call to the delete service method, e.g:
    // this.constructionService.delete(id).subscribe(() => {
    //   console.log('Construction deleted successfully');
    //   this.ngOnInit(); // Reload the list
    // });
  }
}