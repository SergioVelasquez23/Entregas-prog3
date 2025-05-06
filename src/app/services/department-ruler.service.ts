import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DepartmentRuler } from '../models/department-ruler.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentRulerService {

  constructor(private http: HttpClient) { }

  list(): Observable<DepartmentRuler[]> {
    return this.http.get<DepartmentRuler[]>(`${environment.url_ms_cinema}/department_rulers`);
  }

  view(id: number): Observable<DepartmentRuler> {
    return this.http.get<DepartmentRuler>(`${environment.url_ms_cinema}/department_rulers/${id}`);
  }

  create(newDepartmentRuler: DepartmentRuler): Observable<DepartmentRuler> {
    return this.http.post<DepartmentRuler>(`${environment.url_ms_cinema}/department_rulers`, newDepartmentRuler);
  }

  update(theDepartmentRuler: DepartmentRuler): Observable<DepartmentRuler> {
    return this.http.put<DepartmentRuler>(`${environment.url_ms_cinema}/department_rulers/${theDepartmentRuler.id}`, theDepartmentRuler);
  }

  delete(id: number) {
    return this.http.delete<DepartmentRuler>(`${environment.url_ms_cinema}/department_rulers/${id}`);
  }
}