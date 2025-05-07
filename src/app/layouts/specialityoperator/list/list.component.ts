import { Component, OnInit } from '@angular/core';
import { SpecialityOperator } from 'src/app/models/speciality-operator.model'; // Importa el modelo SpecialityOperator
import { SpecialityOperatorService } from 'src/app/services/speciality-operator.service'; // Importa el servicio SpecialityOperatorService
// import { Router } from '@angular/router'; // Importa Router si necesitas navegación

@Component({
  selector: 'app-list-speciality-operator',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListSpecialityOperatorComponent implements OnInit {

  specialityOperators: SpecialityOperator[] = []; // Arreglo para almacenar vínculos, tipado con el modelo SpecialityOperator

  // Inyecta el servicio SpecialityOperatorService y Router (si lo necesitas)
  constructor(private specialityOperatorService: SpecialityOperatorService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Llama al servicio para obtener la lista de vínculos
    this.specialityOperatorService.list().subscribe(data => {
      this.specialityOperators = data; // Asigna los datos a la propiedad specialityOperators
    });
  }

  // Métodos para editar y eliminar (ajusta el tipo de ID según tu modelo SpecialityOperator)
  edit(id: number) {
    console.log('Editando Vínculo Especialidad-Operario ID:', id);
    // Implementa navegación, ej: this.router.navigate(['/admin/specialityoperator/edit', id]);
  }

  delete(id: number) {
    console.log('Eliminando Vínculo Especialidad-Operario ID:', id);
    // Implementa la llamada al servicio delete, ej:
    // this.specialityOperatorService.delete(id).subscribe(() => {
    //   console.log('Vínculo eliminado con éxito');
    //   this.ngOnInit(); // Recarga la lista
    // });
  }
}