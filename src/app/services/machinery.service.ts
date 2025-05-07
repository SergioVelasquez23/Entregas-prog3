import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Machinery } from '../models/machinery.model'; // Importando el modelo Machinery

@Injectable({
  providedIn: 'root'
})
// ¡Modificado aquí! Cambiamos el nombre de la clase del servicio
export class MachineryService { // <--- Nombre de la clase del servicio cambiado a MachineryService

  constructor(private http: HttpClient) { }

  // Dentro de la clase MachineryService, puedes usar el modelo Machinery importado
  // para tipar tus datos, como ya lo estás haciendo correctamente:

  list(): Observable<Machinery[]> {
    return this.http.get<Machinery[]>(`${environment.url_ms_cinema}/machinery`);
  }

  view(id: number): Observable<Machinery> {
    return this.http.get<Machinery>(`${environment.url_ms_cinema}/machinery/${id}`);
  }

  create(newMachinery: Machinery): Observable<Machinery> {
    return this.http.post<Machinery>(`${environment.url_ms_cinema}/machinery`, newMachinery);
  }

  update(theMachinery: Machinery): Observable<Machinery> {
    return this.http.put<Machinery>(`${environment.url_ms_cinema}/machinery/${theMachinery.id}`, theMachinery);
  }

  delete(id: number) {
    return this.http.delete<Machinery>(`${environment.url_ms_cinema}/machinery/${id}`);
  }
}