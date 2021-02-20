import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { components } from './components';
import { SharedModule } from '@shared/shared';
import { sharedPipes } from './pipes';

const modules = [CommonModule, SharedModule];

@NgModule({
  declarations: [...components, ...sharedPipes],
  imports: [...modules],
  exports: [...components, ...modules],
  providers: [],
})
export class FeaturesSharedModule {}
