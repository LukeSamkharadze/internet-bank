import { Observable } from 'rxjs';

export interface BaseHttpInterface<T> {
  getAll(): Observable<T[]>;

  getById(id: number): Observable<T>;

  create(param: T): Observable<T>;

  update(param: T): Observable<T>;

  delete(param: T): Observable<void>;
}
