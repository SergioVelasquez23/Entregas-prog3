import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Speciality } from '../models/speciality.model';

@Injectable({
  providedIn: 'root'
})
export class SpecialitiesService {

  constructor(private http: HttpClient) { }

  list(): Observable<Speciality[]> {
    return this.http.get<Speciality[]>(`${environment.url_ms_cinema}/specialities`);
  }

  view(id: number): Observable<Speciality> {
    return this.http.get<Speciality>(`${environment.url_ms_cinema}/specialities/${id}`);
  }

  create(newSpeciality: Speciality): Observable<Speciality> {
    return this.http.post<Speciality>(`${environment.url_ms_cinema}/specialities`, newSpeciality);
  }

  update(theSpeciality: Speciality): Observable<Speciality> {
    return this.http.put<Speciality>(`${environment.url_ms_cinema}/specialities/${theSpeciality.id}`, theSpeciality);
  }

  delete(id: number) {
    return this.http.delete<Speciality>(`${environment.url_ms_cinema}/specialities/${id}`);
  }
}