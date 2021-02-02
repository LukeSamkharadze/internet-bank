import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedPipes } from './pipes';
import { ReactiveFormsModule } from '@angular/forms';
import { components } from './components';
import { TextareaComponent } from './components/textarea/textarea.component';

const modules = [CommonModule, ReactiveFormsModule];

@NgModule({
  declarations: [...SharedPipes, ...components, TextareaComponent],
  imports: [...modules],
  exports: [...SharedPipes, ...components, ...modules, TextareaComponent],
})
export class SharedModule {}
