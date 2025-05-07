import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Insurance } from '../models/insurance.model';

@Injectable({
  providedIn: 'root'
})
export class insuranceService {

  constructor(private http: HttpClient) { }

  list(): Observable<Insurance[]> {
    return this.http.get<Insurance[]>(`${environment.url_ms_cinema}/insurance`);
  }

  view(id: number): Observable<Insurance> {
    return this.http.get<Insurance>(`${environment.url_ms_cinema}/insurance/${id}`);
  }

  create(newInsurance: Insurance): Observable<Insurance> {
    return this.http.post<Insurance>(`${environment.url_ms_cinema}/insurance`, newInsurance);
  }

  update(theInsurance: Insurance): Observable<Insurance> {
    return this.http.put<Insurance>(`${environment.url_ms_cinema}/insurance/${theInsurance.id}`, theInsurance);
  }

  delete(id: number) {
    return this.http.delete<Insurance>(`${environment.url_ms_cinema}/insurance/${id}`);
  }
}