import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ItemEntity } from '../models/item.entity';
import { filter, switchMap, toArray } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ItemService {
  constructor(private http: HttpClient) {}

  getItems(text: string = ''): Observable<ItemEntity[]> {
    return this.http.get<ItemEntity[]>('http://localhost:3000/items').pipe(
      switchMap((data) => from(data)),
      filter((data) => data.name.includes(text)),
      toArray()
    );
  }
}
