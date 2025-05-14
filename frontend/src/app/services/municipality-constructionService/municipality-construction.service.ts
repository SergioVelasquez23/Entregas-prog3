import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MunicipalityConstruction } from '../../models/municipality-construction.model';

@Injectable({
  providedIn: 'root'
})
export class MunicipalityConstructionService {

  constructor(private http: HttpClient) { }

  list(): Observable<MunicipalityConstruction[]> {
    return this.http.get<MunicipalityConstruction[]>(`${environment.url_ms_cinema}/municipalities_constructions`);
  }

  view(id: number): Observable<MunicipalityConstruction> {
    return this.http.get<MunicipalityConstruction>(`${environment.url_ms_cinema}/municipalities_constructions/${id}`);
  }

  create(newMunicipalityConstruction: MunicipalityConstruction): Observable<MunicipalityConstruction> {
    return this.http.post<MunicipalityConstruction>(`${environment.url_ms_cinema}/municipalities_constructions`, newMunicipalityConstruction);
  }

  update(theMunicipalityConstruction: MunicipalityConstruction): Observable<MunicipalityConstruction> {
    return this.http.put<MunicipalityConstruction>(`${environment.url_ms_cinema}/municipalities_constructions/${theMunicipalityConstruction.id}`, theMunicipalityConstruction);
  }

  delete(id: number) {
    return this.http.delete<MunicipalityConstruction>(`${environment.url_ms_cinema}/municipalities_constructions/${id}`);
  }
}