import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MachinerySpeciality } from '../../models/machinery-speciality.model';

@Injectable({
  providedIn: 'root'
})
export class MachinerySpecialityService {

  constructor(private http: HttpClient) { }

  list(): Observable<MachinerySpeciality[]> {
    return this.http.get<MachinerySpeciality[]>(`${environment.url_ms_cinema}/machinery_speciality`);
  }

  view(id: number): Observable<MachinerySpeciality> {
    return this.http.get<MachinerySpeciality>(`${environment.url_ms_cinema}/machinery_speciality/${id}`);
  }

  create(newMachinerySpeciality: MachinerySpeciality): Observable<MachinerySpeciality> {
    return this.http.post<MachinerySpeciality>(`${environment.url_ms_cinema}/machinery_speciality`, newMachinerySpeciality);
  }

  update(theMachinerySpeciality: MachinerySpeciality): Observable<MachinerySpeciality> {
    return this.http.put<MachinerySpeciality>(`${environment.url_ms_cinema}/machinery_speciality/${theMachinerySpeciality.id}`, theMachinerySpeciality);
  }

  delete(id: number) {
    return this.http.delete<MachinerySpeciality>(`${environment.url_ms_cinema}/machinery_speciality/${id}`);
  }
}