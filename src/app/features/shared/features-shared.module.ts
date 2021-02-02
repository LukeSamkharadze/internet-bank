import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderProfileComponent } from './header-profile/header-profile.component';

@NgModule({
  declarations: [HeaderProfileComponent],
  exports: [HeaderProfileComponent],
  imports: [CommonModule],
})
export class FeaturesSharedModule {}
