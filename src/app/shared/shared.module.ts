import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedPipes } from './pipes';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [...SharedPipes],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [...SharedPipes, ReactiveFormsModule],
})
export class SharedModule {}
