import { Component, OnInit } from '@angular/core';
import { Theater } from 'src/app/models/theater.model';
import { TheaterService } from 'src/app/services/theater.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  theaters: Theater[] = []
  constructor(private theaterService: TheaterService) { }

  ngOnInit(): void {
    this.theaterService.list().subscribe({
      next: (theaters) => {
        this.theaters = theaters;
        console.log('Theaters fetched succesfuly', this.theaters)
      },
      error: (error) => {
        console.error('Error fetching theaters:', error);
      }
    });

    

  }
  edit(id:number){
    console.log("Edit theater with id: ", id);

  }
  delete(id: number) {
    console.log("Delete theater with id:", id);
    Swal.fire({
      title: 'Eliminar',
      text: "Está seguro que quiere eliminar el registro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.theaterService.delete(id).
          subscribe(data => {
            Swal.fire(
              'Eliminado!',
              'Registro eliminado correctamente.',
              'success'
            )
            this.ngOnInit();
          });
      }
    })
   }
}
