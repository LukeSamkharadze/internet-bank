import { NgModule } from '@angular/core';
import { CardViewRoutingModule } from './card-view-routing.module';
import { CardViewComponent } from './card-view.component';
import { CardViewTemplateComponent } from './card-view-template/card-view-template.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared';

@NgModule({
  declarations: [CardViewComponent, CardViewTemplateComponent],
  imports: [CommonModule, SharedModule, CardViewRoutingModule],
  exports: [CardViewComponent],
})
export class CardViewModule {}
