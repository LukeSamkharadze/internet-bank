import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedPipes } from './pipes';
import { ReactiveFormsModule } from '@angular/forms';
import { components } from './components';
import { NgxPaginationModule } from 'ngx-pagination';
const modules = [CommonModule, ReactiveFormsModule, NgxPaginationModule];

@NgModule({
  declarations: [...SharedPipes, ...components],
  imports: [...modules],
  exports: [...SharedPipes, ...components, ...modules, NgxPaginationModule],
})
export class SharedModule {}
