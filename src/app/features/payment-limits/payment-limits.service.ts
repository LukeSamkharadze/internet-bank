import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILimits } from './payment-interfaces';

@Injectable()
export class PaymentLimitsService {
  constructor(private http: HttpClient) {}

  getData(id): Observable<ILimits> {
    return this.http.get<ILimits>(`${environment.URL}limits/${id}`);
  }

  updateUser(id: number, user: ILimits): Observable<boolean> {
    return this.http.put<boolean>(`${environment.URL}limits/${id}`, user);
  }
}
