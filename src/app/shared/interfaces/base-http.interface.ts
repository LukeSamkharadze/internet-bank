import { Injectable } from '@angular/core';

export interface BaseHttpInterface<T> {
  getAll(): T[];

  getById(): T;

  create(): T;

  update(): T;

  delete(): void;
}
