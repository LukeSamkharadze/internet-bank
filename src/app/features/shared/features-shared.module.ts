import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { components } from './components';
import { SharedModule } from '@shared/shared';
import { CardService } from './services/card.service';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';

const services = [CardService];
const modules = [
  CommonModule,
  SharedModule,
  Ng2SearchPipeModule,
  FormsModule,
  BrowserModule,
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components, ...modules],
  providers: [...services],
})
export class FeaturesSharedModule {}
