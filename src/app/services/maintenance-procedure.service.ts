import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MaintenanceProcedure } from '../models/maintenance-procedure.model';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceProcedureService {

  constructor(private http: HttpClient) { }

  list(): Observable<MaintenanceProcedure[]> {
    return this.http.get<MaintenanceProcedure[]>(`${environment.url_ms_cinema}/maintenance_procedure`);
  }

  view(id: number): Observable<MaintenanceProcedure> {
    return this.http.get<MaintenanceProcedure>(`${environment.url_ms_cinema}/maintenance_procedure/${id}`);
  }

  create(newMaintenanceProcedure: MaintenanceProcedure): Observable<MaintenanceProcedure> {
    return this.http.post<MaintenanceProcedure>(`${environment.url_ms_cinema}/maintenance_procedure`, newMaintenanceProcedure);
  }

  update(theMaintenanceProcedure: MaintenanceProcedure): Observable<MaintenanceProcedure> {
    return this.http.put<MaintenanceProcedure>(`${environment.url_ms_cinema}/maintenance_procedure/${theMaintenanceProcedure.id}`, theMaintenanceProcedure);
  }

  delete(id: number) {
    return this.http.delete<MaintenanceProcedure>(`${environment.url_ms_cinema}/maintenance_procedure/${id}`);
  }
}