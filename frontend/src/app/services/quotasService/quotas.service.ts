import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Quotas } from '../../models/quotas.model';

@Injectable({
  providedIn: 'root'
})
export class QuotasService {

  constructor(private http: HttpClient) { }

  list(): Observable<Quotas[]> {
    return this.http.get<Quotas[]>(`${environment.url_ms_cinema}/quotas`);
  }

  view(id: number): Observable<Quotas> {
    return this.http.get<Quotas>(`${environment.url_ms_cinema}/quotas/${id}`);
  }

  create(newQuota: Quotas): Observable<Quotas> {
    return this.http.post<Quotas>(`${environment.url_ms_cinema}/quotas`, newQuota);
  }

  update(theQuota: Quotas): Observable<Quotas> {
    return this.http.put<Quotas>(`${environment.url_ms_cinema}/quotas/${theQuota.id}`, theQuota);
  }

  delete(id: number) {
    return this.http.delete<Quotas>(`${environment.url_ms_cinema}/quotas/${id}`);
  }
}