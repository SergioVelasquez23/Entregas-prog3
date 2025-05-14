import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Spare } from '../../models/spare.model';

@Injectable({
  providedIn: 'root'
})
export class SpareService {

  constructor(private http: HttpClient) { }

  list(): Observable<Spare[]> {
    return this.http.get<Spare[]>(`${environment.url_ms_cinema}/spares`);
  }

  view(id: number): Observable<Spare> {
    return this.http.get<Spare>(`${environment.url_ms_cinema}/spares/${id}`);
  }

  create(newSpare: Spare): Observable<Spare> {
    return this.http.post<Spare>(`${environment.url_ms_cinema}/spares`, newSpare);
  }

  update(theSpare: Spare): Observable<Spare> {
    return this.http.put<Spare>(`${environment.url_ms_cinema}/spares/${theSpare.id}`, theSpare);
  }

  delete(id: number) {
    return this.http.delete<Spare>(`${environment.url_ms_cinema}/spares/${id}`);
  }
}