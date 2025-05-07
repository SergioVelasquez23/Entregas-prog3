import { Component, OnInit } from '@angular/core';
import { Quotas } from 'src/app/models/quotas.model'; // Importa el modelo Quota
import { QuotasService } from 'src/app/services/quotas.service'; // Importa el servicio QuotasService
// import { Router } from '@angular/router'; // Importa Router si necesitas navegación

@Component({
  selector: 'app-list-quota',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListQuotaComponent implements OnInit {

  quotas: Quotas[] = []; // Arreglo para almacenar cuotas, tipado con el modelo Quota

  // Inyecta el servicio QuotasService y Router (si lo necesitas)
  constructor(private quotasService: QuotasService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Llama al servicio para obtener la lista de cuotas
    this.quotasService.list().subscribe(data => {
      this.quotas = data; // Asigna los datos a la propiedad quotas
    });
  }

  // Métodos para editar y eliminar (ajusta el tipo de ID según tu modelo Quota)
  edit(id: number) {
    console.log('Editando Cuota ID:', id);
    // Implementa navegación, ej: this.router.navigate(['/admin/quotas/edit', id]);
  }

  delete(id: number) {
    console.log('Eliminando Cuota ID:', id);
    // Implementa la llamada al servicio delete, ej:
    // this.quotasService.delete(id).subscribe(() => {
    //   console.log('Cuota eliminada con éxito');
    //   this.ngOnInit(); // Recarga la lista
    // });
  }
}