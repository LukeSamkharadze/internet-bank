import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedPipes } from './pipes';
import { ReactiveFormsModule } from '@angular/forms';
import { components } from './components';

const modules = [CommonModule, ReactiveFormsModule];

@NgModule({
  declarations: [...SharedPipes, ...components],
  imports: [...modules],
  exports: [...SharedPipes, ...components, ...modules],
})
export class SharedModule {
}
