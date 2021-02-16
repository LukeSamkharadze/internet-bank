import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class PaymentLimitsService {
  constructor(private http: HttpClient) {}

  getData(id): Observable<ILimits> {
    return this.http.get<ILimits>(`http://localhost:3000/limits/${id}`);
  }

  updateUser(id: number, user: ILimits): Observable<boolean> {
    return this.http.put<boolean>(`http://localhost:3000/limits/${id}`, user);
  }
}

export interface ILimits {
  id?: number;
  bankLimit: number;
  onlineLimit: number;
  cashLimit: number;
  bankSpending: number;
  onlineSpending: number;
  cashSpending: number;
}
