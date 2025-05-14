// insurance/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { Insurance } from 'src/app/models/insurance.model';
import { insuranceService } from 'src/app/services/insuranceService/insurance.service';
// import { Router } from '@angular/router'; // Import Router if you need navigation

@Component({
  selector: 'app-list-insurance',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListInsuranceComponent implements OnInit {

  insurances: Insurance[] = []; // Array to store insurances

  // Inject the InsuranceService and Router (if needed)
  constructor(private insuranceService: insuranceService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Call the service to get the list of insurances
    this.insuranceService.list().subscribe(data => {
      this.insurances = data; // Assign data to the insurances array
    });
  }

  // Methods for edit and delete (adjust ID type based on your Insurance model)
  edit(id: number) {
    console.log('Editing Insurance ID:', id);
    // Implement navigation, e.g: this.router.navigate(['/admin/insurance/edit', id]);
  }

  delete(id: number) {
    console.log('Deleting Insurance ID:', id);
    // Implement the call to the delete service method, e.g:
    // this.insuranceService.delete(id).subscribe(() => {
    //   console.log('Insurance deleted successfully');
    //   this.ngOnInit(); // Reload the list
    // });
  }
}