import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Construction } from '../models/construction.model';

@Injectable({
  providedIn: 'root'
})
export class ConstructionService {

  constructor(private http: HttpClient) { }

  list(): Observable<Construction[]> {
    return this.http.get<Construction[]>(`${environment.url_ms_cinema}/constructions`);
  }

  view(id: number): Observable<Construction> {
    return this.http.get<Construction>(`${environment.url_ms_cinema}/constructions/${id}`);
  }

  create(newConstruction: Construction): Observable<Construction> {
    return this.http.post<Construction>(`${environment.url_ms_cinema}/constructions`, newConstruction);
  }

  update(theConstruction: Construction): Observable<Construction> {
    return this.http.put<Construction>(`${environment.url_ms_cinema}/constructions/${theConstruction.id}`, theConstruction);
  }

  delete(id: number) {
    return this.http.delete<Construction>(`${environment.url_ms_cinema}/constructions/${id}`);
  }
}