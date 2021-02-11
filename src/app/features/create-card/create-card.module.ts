import { NgModule } from '@angular/core';
import { CreateCardComponent } from './create-card.component';
import { FeaturesSharedModule } from '../shared/features-shared.module';
import { CreateCardRoutingModule } from './create-card-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CreateCardComponent],
  imports: [
    FeaturesSharedModule,
    CreateCardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  exports: [CreateCardComponent],
})
export class CreateCardModule {}
