import { Component, OnInit } from '@angular/core';
import { Bill } from 'src/app/models/bill.model'; // Importa el modelo Bill
import { BillService } from 'src/app/services/bill.service'; // Importa el servicio BillService
// import { Router } from '@angular/router'; // Importa Router si necesitas navegación

@Component({
  selector: 'app-list-bill',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListBillComponent implements OnInit {

  bills: Bill[] = []; // Arreglo para almacenar facturas, tipado con el modelo Bill

  // Inyecta el servicio BillService y Router (si lo necesitas)
  constructor(private billService: BillService /*, private router: Router*/) { }

  ngOnInit(): void {
    // Llama al servicio para obtener la lista de facturas
    this.billService.list().subscribe(data => {
      this.bills = data; // Asigna los datos a la propiedad bills
    });
  }

  // Métodos para editar y eliminar (ajusta el tipo de ID según tu modelo Bill)
  edit(id: number) {
    console.log('Editando Factura ID:', id);
    // Implementa navegación, ej: this.router.navigate(['/admin/bill/edit', id]);
  }

  delete(id: number) {
    console.log('Eliminando Factura ID:', id);
    // Implementa la llamada al servicio delete, ej:
    // this.billService.delete(id).subscribe(() => {
    //   console.log('Factura eliminada con éxito');
    //   this.ngOnInit(); // Recarga la lista
    // });
  }
}