import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { components } from './components';
import { SharedModule } from '@shared/shared';
import { sharedPipes } from './pipes';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';

const modules = [CommonModule, ChartsModule, SharedModule];

@NgModule({
  declarations: [...components, ...sharedPipes],
  imports: [...modules],
  exports: [...components, ...modules, ...sharedPipes],
  providers: [],
})
export class FeaturesSharedModule {}
