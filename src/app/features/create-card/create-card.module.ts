import { NgModule } from '@angular/core';
import { CreateCardComponent } from './create-card.component';
import { FeaturesSharedModule } from '../shared/features-shared.module';
import { CreateCardRoutingModule } from './create-card-routing.module';

@NgModule({
  declarations: [CreateCardComponent],
  imports: [FeaturesSharedModule, CreateCardRoutingModule],
  exports: [CreateCardComponent],
})
export class CreateCardModule {}
