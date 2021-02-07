import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { components } from './components';
import { SharedModule } from '@shared/shared';
import { HideNumsPipe } from './components/account-balances/pipes/hide-nums.pipe';

@NgModule({
  declarations: [...components, HideNumsPipe],
  imports: [CommonModule, SharedModule],
  exports: [...components, SharedModule],
  providers: [],
})
export class FeaturesSharedModule {}
