// maintenance/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { Maintenance } from 'src/app/models/maintenance.model';
import { MaintenanceService } from 'src/app/services/maintenance.service';
// import { Router } from '@angular/router'; // Import Router if you need navigation

@Component({
  selector: 'app-list-maintenance',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListMaintenanceComponent implements OnInit {

  maintenances: Maintenance[] = []; // Array to store maintenances

  // Inject the MaintenanceService and Router (if needed)
  constructor(private maintenanceService: MaintenanceService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Call the service to get the list of maintenances
    this.maintenanceService.list().subscribe(data => {
      this.maintenances = data; // Assign data to the maintenances array
    });
  }

  // Methods for edit and delete (adjust ID type based on your Maintenance model)
  edit(id: number) {
    console.log('Editing Maintenance ID:', id);
    // Implement navigation, e.g: this.router.navigate(['/admin/maintenance/edit', id]);
  }

  delete(id: number) {
    console.log('Deleting Maintenance ID:', id);
    // Implement the call to the delete service method, e.g:
    // this.maintenanceService.delete(id).subscribe(() => {
    //   console.log('Maintenance deleted successfully');
    //   this.ngOnInit(); // Reload the list
    // });
  }
}