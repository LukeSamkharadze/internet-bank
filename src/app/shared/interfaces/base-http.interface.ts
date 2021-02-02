import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface BaseHttpInterface<T> {
  getAll(): Observable<T[]>;

  getById(): Observable<T>;

  create(): Observable<T>;

  update(): Observable<T>;

  delete(): Observable<void>;
}
