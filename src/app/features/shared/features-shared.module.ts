import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { components } from './components';
import { SharedModule } from '@shared/shared';

@NgModule({
  declarations: [...components],
  imports: [CommonModule, SharedModule],
  exports: [...components],
  providers: [],
})
export class FeaturesSharedModule {}
