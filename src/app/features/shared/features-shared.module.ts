import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { components } from './components';
import { SharedModule } from '@shared/shared';
import { CardService } from './services/card.service';

@NgModule({
  declarations: [...components],
  imports: [CommonModule, SharedModule],
  exports: [...components, SharedModule],
  providers: [CardService],
})
export class FeaturesSharedModule {}
