import { NgModule } from '@angular/core';
import { SettingsAndMenuComponent } from './settings-and-menu.component';
import { FeaturesSharedModule } from '../shared/features-shared.module';
import { SettingsAndMenuRouting } from './settings-and-menu-routing.module';

@NgModule({
  declarations: [SettingsAndMenuComponent],
  imports: [FeaturesSharedModule, SettingsAndMenuRouting],
  exports: [SettingsAndMenuComponent],
})
export class SettingsAndMenuModule {}
