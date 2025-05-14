// machineryspeciality/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { MachinerySpeciality } from 'src/app/models/machinery-speciality.model';
import { MachinerySpecialityService } from 'src/app/services/machinery-SpecialitiesService/machinery-speciality.service';
// import { Router } from '@angular/router'; // Import Router if you need navigation

@Component({
  selector: 'app-list-machinery-speciality',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListMachinerySpecialityComponent implements OnInit {

  machinerySpecialities: MachinerySpeciality[] = []; // Array to store machinery-speciality links

  // Inject the MachinerySpecialityService and Router (if needed)
  constructor(private machinerySpecialityService: MachinerySpecialityService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Call the service to get the list of links
    this.machinerySpecialityService.list().subscribe(data => {
      this.machinerySpecialities = data; // Assign data to the machinerySpecialities array
    });
  }

  // Methods for edit and delete (adjust ID type based on your MachinerySpeciality model)
  edit(id: number) {
    console.log('Editing Machinery-Speciality Link ID:', id);
    // Implement navigation, e.g: this.router.navigate(['/admin/machineryspeciality/edit', id]);
  }

  delete(id: number) {
    console.log('Deleting Machinery-Speciality Link ID:', id);
    // Implement the call to the delete service method, e.g:
    // this.machinerySpecialityService.delete(id).subscribe(() => {
    //   console.log('Machinery-Speciality Link deleted successfully');
    //   this.ngOnInit(); // Reload the list
    // });
  }
}