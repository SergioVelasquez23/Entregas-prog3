import { Component, OnInit } from '@angular/core';
import { Operario } from 'src/app/models/operator.model'; // Importa el modelo Operario
import { OperatorService } from 'src/app/services/operatorService/operator.service'; // Importa el servicio OperatorService
// import { Router } from '@angular/router'; // Importa Router si necesitas navegación

@Component({
  selector: 'app-list-operator',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListOperatorComponent implements OnInit {

  operarios: Operario[] = []; // Arreglo para almacenar operarios, tipado con el modelo Operario

  // Inyecta el servicio OperatorService y Router (si lo necesitas)
  constructor(private operatorService: OperatorService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Llama al servicio para obtener la lista de operarios
    this.operatorService.list().subscribe(data => {
      this.operarios = data; // Asigna los datos a la propiedad operarios
    });
  }

  // Métodos para editar y eliminar (ajusta el tipo de ID según tu modelo Operario)
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