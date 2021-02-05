import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BaseHttpInterface } from '../../../shared/interfaces/base-http.interface';
import { ICard } from '../interfaces/card.interface';

@Injectable()
export class CardService implements BaseHttpInterface<ICard> {
  constructor(private http: HttpClient) {}

  create(card: ICard): Observable<ICard> {
    return this.http.post<ICard>(`${environment.url}cards`, card);
  }

  getAll(): Observable<ICard[]> {
    return this.http.get<ICard[]>(`${environment.url}cards`);
  }

  getById(): Observable<ICard> {
    return EMPTY;
  }

  update(): Observable<ICard> {
    return EMPTY;
  }

  delete(): Observable<void> {
    return EMPTY;
  }
}
