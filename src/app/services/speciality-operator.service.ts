import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SpecialityOperator } from '../models/speciality-operator.model';

@Injectable({
  providedIn: 'root'
})
export class SpecialityOperatorService {

  constructor(private http: HttpClient) { }

  list(): Observable<SpecialityOperator[]> {
    return this.http.get<SpecialityOperator[]>(`${environment.url_ms_cinema}/specialities_operator`);
  }

  view(id: number): Observable<SpecialityOperator> {
    return this.http.get<SpecialityOperator>(`${environment.url_ms_cinema}/specialities_operator/${id}`);
  }

  create(newSpecialtyOperator: SpecialityOperator): Observable<SpecialityOperator> {
    return this.http.post<SpecialityOperator>(`${environment.url_ms_cinema}/specialities_operator`, newSpecialtyOperator);
  }

  update(theSpecialtyOperator: SpecialityOperator): Observable<SpecialityOperator> {
    return this.http.put<SpecialityOperator>(`${environment.url_ms_cinema}/specialities_operator/${theSpecialtyOperator.id}`, theSpecialtyOperator);
  }

  delete(id: number) {
    return this.http.delete<SpecialityOperator>(`${environment.url_ms_cinema}/specialities_operator/${id}`);
  }
}