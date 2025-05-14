import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Maintenance } from '../../models/maintenance.model';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  constructor(private http: HttpClient) { }

  list(): Observable<Maintenance[]> {
    return this.http.get<Maintenance[]>(`${environment.url_ms_cinema}/maintenance`);
  }

  view(id: number): Observable<Maintenance> {
    return this.http.get<Maintenance>(`${environment.url_ms_cinema}/maintenance/${id}`);
  }

  create(newMaintenance: Maintenance): Observable<Maintenance> {
    return this.http.post<Maintenance>(`${environment.url_ms_cinema}/maintenance`, newMaintenance);
  }

  update(theMaintenance: Maintenance): Observable<Maintenance> {
    return this.http.put<Maintenance>(`${environment.url_ms_cinema}/maintenance/${theMaintenance.id}`, theMaintenance);
  }

  delete(id: number) {
    return this.http.delete<Maintenance>(`${environment.url_ms_cinema}/maintenance/${id}`);
  }
}