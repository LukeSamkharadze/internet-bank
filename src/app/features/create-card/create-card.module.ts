import { NgModule } from '@angular/core';
import { CreateCardComponent } from './create-card.component';
import { SharedModule } from '@shared/shared';
import { FeaturesSharedModule } from '../shared/features-shared.module';
import { CreateCardRoutingModule } from './create-card-routing.module';

@NgModule({
  declarations: [CreateCardComponent],
  imports: [SharedModule, FeaturesSharedModule, CreateCardRoutingModule],
  exports: [CreateCardComponent],
})
export class CreateCardModule {}
