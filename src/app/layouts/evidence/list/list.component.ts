import { Component, OnInit } from '@angular/core';
import { Evidence } from 'src/app/models/evidence.model'; // Importa el modelo Evidence
import { EvidenceService } from 'src/app/services/evidence.service'; // Importa el servicio EvidenceService
// import { Router } from '@angular/router'; // Importa Router si necesitas navegación

@Component({
  selector: 'app-list-evidence',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListEvidenceComponent implements OnInit {

  evidences: Evidence[] = []; // Arreglo para almacenar evidencias, tipado con el modelo Evidence

  // Inyecta el servicio EvidenceService y Router (si lo necesitas)
  constructor(private evidenceService: EvidenceService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Llama al servicio para obtener la lista de evidencias
    this.evidenceService.list().subscribe(data => {
      this.evidences = data; // Asigna los datos a la propiedad evidences
    });
  }

  // Métodos para editar y eliminar (ajusta el tipo de ID según tu modelo Evidence)
  edit(id: number) {
    console.log('Editando Evidencia ID:', id);
    // Implementa navegación, ej: this.router.navigate(['/admin/evidence/edit', id]);
  }

  delete(id: number) {
    console.log('Eliminando Evidencia ID:', id);
    // Implementa la llamada al servicio delete, ej:
    // this.evidenceService.delete(id).subscribe(() => {
    //   console.log('Evidencia eliminada con éxito');
    //   this.ngOnInit(); // Recarga la lista
    // });
  }
}