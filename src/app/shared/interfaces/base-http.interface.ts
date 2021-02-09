import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface BaseHttpInterface<T> {
  getAll(): Observable<T[]>;

  getById(): Observable<T>;

  create(param: T): Observable<T>;

  update(): Observable<T>;

  delete(): Observable<void>;
}
