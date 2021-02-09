import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedPipes } from './pipes';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { components } from './components';
import { NgxPaginationModule } from 'ngx-pagination';

const modules = [
  CommonModule,
  ReactiveFormsModule,
  HttpClientModule,
  NgxPaginationModule,
];

@NgModule({
  declarations: [...SharedPipes, ...components],
  imports: [...modules],
  exports: [...SharedPipes, ...components, ...modules],
})
export class SharedModule {}
