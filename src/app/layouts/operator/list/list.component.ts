import { Component, OnInit } from '@angular/core';
import { Operator } from 'src/app/models/operator.model'; // Importa el modelo Operator
import { OperatorService } from 'src/app/services/operator.service'; // Importa el servicio OperatorService
// import { Router } from '@angular/router'; // Importa Router si necesitas navegación

@Component({
  selector: 'app-list-operator',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListOperatorComponent implements OnInit {

  operators: Operator[] = []; // Arreglo para almacenar operarios, tipado con el modelo Operator

  // Inyecta el servicio OperatorService y Router (si lo necesitas)
  constructor(private operatorService: OperatorService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Llama al servicio para obtener la lista de operarios
    this.operatorService.list().subscribe(data => {
      this.operators = data; // Asigna los datos a la propiedad operators
    });
  }

  // Métodos para editar y eliminar (ajusta el tipo de ID según tu modelo Operator)
  edit(id: number) {
    console.log('Editando Operario ID:', id);
    // Implementa navegación, ej: this.router.navigate(['/admin/operator/edit', id]);
  }

  delete(id: number) {
    console.log('Eliminando Operario ID:', id);
    // Implementa la llamada al servicio delete, ej:
    // this.operatorService.delete(id).subscribe(() => {
    //   console.log('Operario eliminado con éxito');
    //   this.ngOnInit(); // Recarga la lista
    // });
  }
}