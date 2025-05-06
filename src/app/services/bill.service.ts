import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bill } from '../models/bill.model';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }

  list(): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${environment.url_ms_cinema}/bills`);
  }

  view(id: number): Observable<Bill> {
    return this.http.get<Bill>(`${environment.url_ms_cinema}/bills/${id}`);
  }

  create(newBill: Bill): Observable<Bill> {
    return this.http.post<Bill>(`${environment.url_ms_cinema}/bills`, newBill);
  }

  update(theBill: Bill): Observable<Bill> {
    return this.http.put<Bill>(`${environment.url_ms_cinema}/bills/${theBill.id}`, theBill);
  }

  delete(id: number) {
    return this.http.delete<Bill>(`${environment.url_ms_cinema}/bills/${id}`);
  }
}