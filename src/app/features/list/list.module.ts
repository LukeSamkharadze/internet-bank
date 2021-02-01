import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { ItemComponent } from './item-list/item/item.component';
import { ItemListOptionsComponent } from './item-list-options/item-list-options.component';
import { ItemService } from './services/item.service';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemListOptionsService } from './services/item-list-options.service';
import { SharedModule } from '@shared/shared';
import { ListRoutingModule } from './list-routing.module';

@NgModule({
  declarations: [
    ListComponent,
    ItemComponent,
    ItemListOptionsComponent,
    ItemListComponent,
  ],
  imports: [CommonModule, SharedModule, ListRoutingModule],
  providers: [ItemService, ItemListOptionsService],
  exports: [ListComponent],
})
export class ListModule {}
