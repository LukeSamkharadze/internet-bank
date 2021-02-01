import { Injectable } from '@angular/core';

@Injectable()
export interface BaseHttpInterface<T> {
  getAll(): T[];

  getById(): T;

  create(): T;

  update(): T;

  delete(): void;
}
