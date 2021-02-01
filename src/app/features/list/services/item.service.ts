import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemEntity } from '../models/item.entity';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ItemService {
  constructor(private http: HttpClient) {}

  getItems(): Observable<ItemEntity[]> {
    return this.http
      .get<ItemEntity[]>('http://localhost:3000/items');
  }
}
