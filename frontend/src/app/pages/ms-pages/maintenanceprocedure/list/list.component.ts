import { Component, OnInit } from '@angular/core';
import { MaintenanceProcedure } from 'src/app/models/maintenance-procedure.model'; // Importa el modelo MaintenanceProcedure
import { MaintenanceProcedureService } from 'src/app/services/maintenance-procedureService/maintenance-procedure.service'; // Importa el servicio MaintenanceProcedureService
// import { Router } from '@angular/router'; // Importa Router si necesitas navegación

@Component({
  selector: 'app-list-maintenance-procedure',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListMaintenanceProcedureComponent implements OnInit {

  maintenanceProcedures: MaintenanceProcedure[] = []; // Arreglo para almacenar vínculos, tipado con el modelo MaintenanceProcedure

  // Inyecta el servicio MaintenanceProcedureService y Router (si lo necesitas)
  constructor(private maintenanceProcedureService: MaintenanceProcedureService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Llama al servicio para obtener la lista de vínculos
    this.maintenanceProcedureService.list().subscribe(data => {
      this.maintenanceProcedures = data; // Asigna los datos a la propiedad maintenanceProcedures
    });
  }

  // Métodos para editar y eliminar (ajusta el tipo de ID según tu modelo MaintenanceProcedure)
  edit(id: number) {
    console.log('Editando Vínculo Procedimiento-Mantenimiento ID:', id);
    // Implementa navegación, ej: this.router.navigate(['/admin/maintenanceprocedure/edit', id]);
  }

  delete(id: number) {
    console.log('Eliminando Vínculo Procedimiento-Mantenimiento ID:', id);
    // Implementa la llamada al servicio delete, ej:
    // this.maintenanceProcedureService.delete(id).subscribe(() => {
    //   console.log('Vínculo eliminado con éxito');
    //   this.ngOnInit(); // Recarga la lista
    // });
  }
}