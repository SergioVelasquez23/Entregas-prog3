import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MunicipalityRuler } from '../models/municipality-ruler.model';

@Injectable({
  providedIn: 'root'
})
export class MunicipalityRulerService {

  constructor(private http: HttpClient) { }

  list(): Observable<MunicipalityRuler[]> {
    return this.http.get<MunicipalityRuler[]>(`${environment.url_ms_cinema}/municipalities_rulers`);
  }

  view(id: number): Observable<MunicipalityRuler> {
    return this.http.get<MunicipalityRuler>(`${environment.url_ms_cinema}/municipalities_rulers/${id}`);
  }

  create(newMunicipalityRuler: MunicipalityRuler): Observable<MunicipalityRuler> {
    return this.http.post<MunicipalityRuler>(`${environment.url_ms_cinema}/municipalities_rulers`, newMunicipalityRuler);
  }

  update(theMunicipalityRuler: MunicipalityRuler): Observable<MunicipalityRuler> {
    return this.http.put<MunicipalityRuler>(`${environment.url_ms_cinema}/municipalities_rulers/${theMunicipalityRuler.id}`, theMunicipalityRuler);
  }

  delete(id: number) {
    return this.http.delete<MunicipalityRuler>(`${environment.url_ms_cinema}/municipalities_rulers/${id}`);
  }
}