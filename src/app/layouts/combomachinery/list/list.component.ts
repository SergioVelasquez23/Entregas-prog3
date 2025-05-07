// combomachinery/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { ComboMachinery } from 'src/app/models/combo-machinery.model';
import { ComboMachineryService } from 'src/app/services/combo-machinery.service';
// import { Router } from '@angular/router'; // Import Router if you need navigation

@Component({
  selector: 'app-list-combo-machinery',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComboMachineryComponent implements OnInit {

  comboMachineries: ComboMachinery[] = []; // Array to store combo-machinery links

  // Inject the ComboMachineryService and Router (if needed)
  constructor(private comboMachineryService: ComboMachineryService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Call the service to get the list of links
    this.comboMachineryService.list().subscribe(data => {
      this.comboMachineries = data; // Assign data to the array property
    });
  }

  // Methods for edit and delete (adjust ID type based on your ComboMachinery model)
  edit(id: number) {
    console.log('Editing Combo-Machinery Link ID:', id);
    // Implement navigation, e.g: this.router.navigate(['/admin/combomachinery/edit', id]);
  }

  delete(id: number) {
    console.log('Deleting Combo-Machinery Link ID:', id);
    // Implement the call to the delete service method, e.g:
    // this.comboMachineryService.delete(id).subscribe(() => {
    //   console.log('Combo-Machinery Link deleted successfully');
    //   this.ngOnInit(); // Reload the list
    // });
  }
}