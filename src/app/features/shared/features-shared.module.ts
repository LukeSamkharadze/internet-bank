import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Components } from './components';

@NgModule({
  declarations: [...Components],
  imports: [CommonModule],
  providers: [],
})
export class FeaturesSharedModule {}
