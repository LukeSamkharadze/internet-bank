import { NgModule } from '@angular/core';
import { CreateCardComponent } from './create-card.component';
import { CreateCardRoutingModule } from './create-card-routing.module';
import { SharedModule } from '@shared/shared';
import { TypeSwitcherService } from './services/type-switcher.service';

@NgModule({
  declarations: [CreateCardComponent],
  imports: [CreateCardRoutingModule, SharedModule],
  exports: [CreateCardComponent],
  providers: [TypeSwitcherService],
})
export class CreateCardModule {}
