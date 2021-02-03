import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedPipes } from './pipes';
import { ReactiveFormsModule } from '@angular/forms';
import { components } from './components';
import { PaginationComponent } from './components/pagination/pagination.component';
import { NgxPaginationModule } from 'ngx-pagination';
const modules = [CommonModule, ReactiveFormsModule];

@NgModule({
  declarations: [...SharedPipes, ...components, PaginationComponent],
  imports: [...modules, NgxPaginationModule],
  exports: [...SharedPipes, ...components, ...modules],
})
export class SharedModule {}
