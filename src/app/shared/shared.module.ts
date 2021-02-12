import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedPipes } from './pipes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { components } from './components';

const modules = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  NgxPaginationModule,
];

@NgModule({
  declarations: [...SharedPipes, ...components],
  imports: [...modules],
  exports: [...SharedPipes, ...components, ...modules],
})
export class SharedModule {}
