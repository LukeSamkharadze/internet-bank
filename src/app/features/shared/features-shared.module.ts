import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { components } from './components';
import { SharedModule } from '@shared/shared';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { AuthService } from './services/auth.service';
import { RouterModule } from '@angular/router';
import { FeaturesSharedRoutingModule } from './features-shared-routing.module';
import { sharedPipes } from './pipes';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';

// const services = [CardService];
const modules = [
  CommonModule,
  SharedModule,
  Ng2SearchPipeModule,
  FormsModule,
  MatDatepickerModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  RouterModule,
  FeaturesSharedRoutingModule,
  ChartsModule,
  SharedModule,
];

@NgModule({
  declarations: [...components, ...sharedPipes],
  imports: [...modules],
  exports: [...components, ...modules],
  providers: [],
})
export class FeaturesSharedModule {}
