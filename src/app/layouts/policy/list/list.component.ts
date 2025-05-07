import { Component, OnInit } from '@angular/core';
import { Policy } from 'src/app/models/policy.model'; // Importa el modelo Policy
import { PolicyService } from 'src/app/services/policy.service'; // Importa el servicio PolicyService
// import { Router } from '@angular/router'; // Importa Router si necesitas navegación

@Component({
  selector: 'app-list-policy',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListPolicyComponent implements OnInit {

  policies: Policy[] = []; // Arreglo para almacenar pólizas, tipado con el modelo Policy

  // Inyecta el servicio PolicyService y Router (si lo necesitas)
  constructor(private policyService: PolicyService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Llama al servicio para obtener la lista de pólizas
    this.policyService.list().subscribe(data => {
      this.policies = data; // Asigna los datos a la propiedad policies
    });
  }

  // Métodos para editar y eliminar (ajusta el tipo de ID según tu modelo Policy)
  edit(id: number) {
    console.log('Editando Póliza ID:', id);
    // Implementa navegación, ej: this.router.navigate(['/admin/policy/edit', id]);
  }

  delete(id: number) {
    console.log('Eliminando Póliza ID:', id);
    // Implementa la llamada al servicio delete, ej:
    // this.policyService.delete(id).subscribe(() => {
    //   console.log('Póliza eliminada con éxito');
    //   this.ngOnInit(); // Recarga la lista
    // });
  }
}