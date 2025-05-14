// shift/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { Shift } from 'src/app/models/shift.model';
import { ShiftService } from 'src/app/services/shiftService/shift.service';
// import { Router } from '@angular/router'; // Import Router if you need navigation

@Component({
  selector: 'app-list-shift',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListShiftComponent implements OnInit {

  shifts: Shift[] = []; // Array to store shifts

  // Inject the service and Router (if needed)
  constructor(private shiftService: ShiftService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Call the service to get the list
    this.shiftService.list().subscribe(data => {
      this.shifts = data; // Assign data to the array property
    });
  }

  // Methods for edit and delete (adjust ID type based on your model)
  edit(id: number) {
    console.log('Editing Shift ID:', id);
    // Implement navigation
  }

  delete(id: number) {
    console.log('Deleting Shift ID:', id);
    // Implement call to the delete service method
  }
}