import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Evidence } from '../models/evidence.model';

@Injectable({
  providedIn: 'root'
})
export class EvidenceService {

  constructor(private http: HttpClient) { }

  list(): Observable<Evidence[]> {
    return this.http.get<Evidence[]>(`${environment.url_ms_cinema}/evidence`);
  }

  view(id: number): Observable<Evidence> {
    return this.http.get<Evidence>(`${environment.url_ms_cinema}/evidence/${id}`);
  }

  create(newEvidence: Evidence): Observable<Evidence> {
    return this.http.post<Evidence>(`${environment.url_ms_cinema}/evidence`, newEvidence);
  }

  update(theEvidence: Evidence): Observable<Evidence> {
    return this.http.put<Evidence>(`${environment.url_ms_cinema}/evidence/${theEvidence.id}`, theEvidence);
  }

  delete(id: number) {
    return this.http.delete<Evidence>(`${environment.url_ms_cinema}/evidence/${id}`);
  }
}