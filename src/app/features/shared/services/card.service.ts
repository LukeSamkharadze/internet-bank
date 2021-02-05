import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { BaseHttpInterface } from 'src/app/shared/interfaces/base-http.interface';
import { ICard } from '../interfaces/card.interface';

@Injectable()
export class CardService implements BaseHttpInterface<ICard> {
  public url = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  create(card: ICard): Observable<ICard> {
    return this.http.post<ICard>(`${this.url}cards`, card);
  }

  getAll(): Observable<ICard[]> {
    return this.http.get<ICard[]>(`${this.url}cards`);
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
