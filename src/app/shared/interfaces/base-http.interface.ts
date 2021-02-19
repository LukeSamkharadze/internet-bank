import { Observable } from 'rxjs';

export interface BaseHttpInterface<T> {
  getAll(): Observable<T[]>;

  getById(id: number): Observable<T>;

  create(param: T): Observable<T>;

  update(): Observable<T>;

  delete(): Observable<void>;
}
