import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { components } from './components';
import { SharedModule } from '@shared/shared';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [...components],
  imports: [CommonModule, SharedModule, Ng2SearchPipeModule, FormsModule],
  exports: [...components, SharedModule],
  providers: [],
})
export class FeaturesSharedModule {}
