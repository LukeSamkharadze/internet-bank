import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILimits } from '../../payment-limits/payment-interfaces';

@Injectable({
  providedIn: 'root',
})
export class PaymentLimitsService {
  constructor(private http: HttpClient) {}

  getById(id): Observable<ILimits> {
    return this.http.get<ILimits>(`${environment.BaseUrl}limits/${id}`);
  }
  updateUser(id: number, user: ILimits): Observable<boolean> {
    return this.http.put<boolean>(`${environment.BaseUrl}limits/${id}`, user);
  }
  createUserLimits(limits: ILimits) {
    return this.http.post<ILimits>(`${environment.BaseUrl}limits`, limits);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.BaseUrl}limits/${id}`);
  }
}
