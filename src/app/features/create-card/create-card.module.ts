import { NgModule } from '@angular/core';
import { CreateCardComponent } from './create-card.component';
import { CreateCardRoutingModule } from './create-card-routing.module';
import { SharedModule } from '@shared/shared';

@NgModule({
  declarations: [CreateCardComponent],
  imports: [CreateCardRoutingModule, SharedModule],
  exports: [CreateCardComponent],
})
export class CreateCardModule {}
