import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { components } from './components';
import { SharedModule } from '@shared/shared';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';

const modules = [CommonModule, ChartsModule, SharedModule];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components, ...modules],
  providers: [],
})
export class FeaturesSharedModule {}
