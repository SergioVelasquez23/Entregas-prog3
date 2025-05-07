// departmentruler/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { DepartmentRuler } from 'src/app/models/department-ruler.model';
import { DepartmentRulerService } from 'src/app/services/department-ruler.service';
// import { Router } from '@angular/router'; // Import Router if you need navigation

@Component({
  selector: 'app-list-department-ruler',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListDepartmentRulerComponent implements OnInit {

  departmentRulers: DepartmentRuler[] = []; // Array to store department-ruler links

  // Inject the DepartmentRulerService and Router (if needed)
  constructor(private departmentRulerService: DepartmentRulerService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Call the service to get the list of links
    this.departmentRulerService.list().subscribe(data => {
      this.departmentRulers = data; // Assign data to the departmentRulers array
    });
  }

  // Methods for edit and delete (adjust ID type based on your DepartmentRuler model)
  edit(id: number) {
    console.log('Editing Department-Ruler Link ID:', id);
    // Implement navigation, e.g: this.router.navigate(['/admin/departmentruler/edit', id]);
  }

  delete(id: number) {
    console.log('Deleting Department-Ruler Link ID:', id);
    // Implement the call to the delete service method, e.g:
    // this.departmentRulerService.delete(id).subscribe(() => {
    //   console.log('Department-Ruler Link deleted successfully');
    //   this.ngOnInit(); // Reload the list
    // });
  }
}