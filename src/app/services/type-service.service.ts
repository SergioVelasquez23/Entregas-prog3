import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TypeService } from '../models/type-service.model';

@Injectable({
  providedIn: 'root'
})
export class TypeServiceService {

  constructor(private http: HttpClient) { }

  list(): Observable<TypeService[]> {
    return this.http.get<TypeService[]>(`${environment.url_ms_cinema}/type_services`);
  }

  view(id: number): Observable<TypeService> {
    return this.http.get<TypeService>(`${environment.url_ms_cinema}/type_services/${id}`);
  }

  create(newTypeService: TypeService): Observable<TypeService> {
    return this.http.post<TypeService>(`${environment.url_ms_cinema}/type_services`, newTypeService);
  }

  update(theTypeService: TypeService): Observable<TypeService> {
    return this.http.put<TypeService>(`${environment.url_ms_cinema}/type_services/${theTypeService.id}`, theTypeService);
  }

  delete(id: number) {
    return this.http.delete<TypeService>(`${environment.url_ms_cinema}/type_services/${id}`);
  }
}