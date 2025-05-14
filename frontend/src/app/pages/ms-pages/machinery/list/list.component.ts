import { Component, OnInit } from '@angular/core';
import { Machinery } from 'src/app/models/machinery.model'; // Importa el modelo Machinery
import { MachineryService } from 'src/app/services/machineryService/machinery.service'; // Importa el servicio MachineryService
// import { Router } from '@angular/router'; // Importa Router si necesitas navegación

@Component({
  selector: 'app-list-machinery',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListMachineryComponent implements OnInit {

  machineries: Machinery[] = []; // Arreglo para almacenar maquinarias, tipado con el modelo Machinery

  // Inyecta el servicio MachineryService y Router (si lo necesitas)
  constructor(private machineryService: MachineryService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Llama al servicio para obtener la lista de maquinarias
    this.machineryService.list().subscribe(data => {
      this.machineries = data; // Asigna los datos a la propiedad machineries
    });
  }

  // Métodos para editar y eliminar (ajusta el tipo de ID según tu modelo Machinery)
  edit(id: number) {
    console.log('Editando Maquinaria ID:', id);
    // Implementa navegación, ej: this.router.navigate(['/admin/machinery/edit', id]);
  }

  delete(id: number) {
    console.log('Eliminando Maquinaria ID:', id);
    // Implementa la llamada al servicio delete, ej:
    // this.machineryService.delete(id).subscribe(() => {
    //   console.log('Maquinaria eliminada con éxito');
    //   this.ngOnInit(); // Recarga la lista
    // });
  }
}