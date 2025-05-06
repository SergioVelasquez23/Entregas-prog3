import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ComboMachinery } from '../models/combo-machinery.model';

@Injectable({
  providedIn: 'root'
})
export class ComboMachineryService {

  constructor(private http: HttpClient) { }

  list(): Observable<ComboMachinery[]> {
    return this.http.get<ComboMachinery[]>(`${environment.url_ms_cinema}/combomachineries`);
  }

  view(id: number): Observable<ComboMachinery> {
    return this.http.get<ComboMachinery>(`${environment.url_ms_cinema}/combomachineries/${id}`);
  }

  create(newComboMachinery: ComboMachinery): Observable<ComboMachinery> {
    return this.http.post<ComboMachinery>(`${environment.url_ms_cinema}/combomachineries`, newComboMachinery);
  }

  update(theComboMachinery: ComboMachinery): Observable<ComboMachinery> {
    return this.http.put<ComboMachinery>(`${environment.url_ms_cinema}/combomachineries/${theComboMachinery.id}`, theComboMachinery);
  }

  delete(id: number) {
    return this.http.delete<ComboMachinery>(`${environment.url_ms_cinema}/combomachineries/${id}`);
  }
}