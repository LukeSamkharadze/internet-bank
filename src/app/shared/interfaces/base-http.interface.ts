import { Observable } from 'rxjs';

export interface BaseHttpInterface<T> {
  getAll(): Observable<T[]>;

  getById(id: number): Observable<T>;

  create(param: T): Observable<T>;

  update(user: T): Observable<T>;

  delete(id): Observable<void>;
}
