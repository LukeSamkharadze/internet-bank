import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedPipes } from './pipes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { components } from './components';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const modules = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  HttpClientModule,
  NgxPaginationModule,
  FormsModule,
  BrowserAnimationsModule,
];

@NgModule({
  declarations: [...SharedPipes, ...components],
  imports: [...modules],
  exports: [...SharedPipes, ...components, ...modules],
})
export class SharedModule {}
