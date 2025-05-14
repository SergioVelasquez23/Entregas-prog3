import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Servicio } from 'src/app/models/service.model';
import { ServicioService } from 'src/app/services/serviceService/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number; //1->View, 2->Create, 3-> Update
  servicio: Servicio;

  constructor(private activateRoute: ActivatedRoute,
    private someServicio: ServicioService,
    private router: Router
  ) {
    this.servicio = { id: 0 }
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.servicio.id = this.activateRoute.snapshot.params.id
      this.getService(this.servicio.id)
    }
  }
  getService(id: number) {
    this.someServicio.view(id).subscribe({
      next: (service) => {
        this.servicio = service;
        console.log('Service fetched successfully:', this.servicio);
      },
      error: (error) => {
        console.error('Error fetching service:', error);
      }
    });
  }
  back() {
    this.router.navigate(['service/list'])
  }
  create() {
    this.someServicio.create(this.servicio).subscribe({
      next: (service) => {
        console.log('service created successfully:', service);
        Swal.fire({
          title: 'Creado!',
          text: 'Registro creado correctamente.',
          icon: 'success',
        })
        this.router.navigate(['/services/list']);
      },
      error: (error) => {
        console.error('Error creating service:', error);
      }
    });
  }
  update() {
    this.someServicio.update(this.servicio).subscribe({
      next: (servicio) => {
        console.log('service updated successfully:', servicio);
        Swal.fire({
          title: 'Actualizado!',
          text: 'Registro actualizado correctamente.',
          icon: 'success',
        })
        this.router.navigate(['/services/list']);
      },
      error: (error) => {
        console.error('Error updating service:', error);
      }
    });
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
        this.someServicio.delete(id).
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
