import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ruler } from '../../models/ruler.model';

@Injectable({
  providedIn: 'root'
})
export class RulerService {

  constructor(private http: HttpClient) { }

  list(): Observable<Ruler[]> {
    return this.http.get<Ruler[]>(`${environment.url_ms_cinema}/rulers`);
  }

  view(id: number): Observable<Ruler> {
    return this.http.get<Ruler>(`${environment.url_ms_cinema}/rulers/${id}`);
  }

  create(newRuler: Ruler): Observable<Ruler> {
    return this.http.post<Ruler>(`${environment.url_ms_cinema}/rulers`, newRuler);
  }

  update(theRuler: Ruler): Observable<Ruler> {
    return this.http.put<Ruler>(`${environment.url_ms_cinema}/rulers/${theRuler.id}`, theRuler);
  }

  delete(id: number) {
    return this.http.delete<Ruler>(`${environment.url_ms_cinema}/rulers/${id}`);
  }
}