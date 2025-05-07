import { Component, OnInit } from '@angular/core';
import { Spare } from 'src/app/models/spare.model'; // Importa el modelo Spare
import { SpareService } from 'src/app/services/spare.service'; // Importa el servicio SpareService
// import { Router } from '@angular/router'; // Importa Router si necesitas navegación

@Component({
  selector: 'app-list-spare',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListSpareComponent implements OnInit {

  spares: Spare[] = []; // Arreglo para almacenar repuestos, tipado con el modelo Spare

  // Inyecta el servicio SpareService y Router (si lo necesitas)
  constructor(private spareService: SpareService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Llama al servicio para obtener la lista de repuestos
    this.spareService.list().subscribe(data => {
      this.spares = data; // Asigna los datos a la propiedad spares
    });
  }

  // Métodos para editar y eliminar (ajusta el tipo de ID según tu modelo Spare)
  edit(id: number) {
    console.log('Editando Repuesto ID:', id);
    // Implementa navegación, ej: this.router.navigate(['/admin/spare/edit', id]);
  }

  delete(id: number) {
    console.log('Eliminando Repuesto ID:', id);
    // Implementa la llamada al servicio delete, ej:
    // this.spareService.delete(id).subscribe(() => {
    //   console.log('Repuesto eliminado con éxito');
    //   this.ngOnInit(); // Recarga la lista
    // });
  }
}