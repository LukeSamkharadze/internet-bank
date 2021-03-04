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
import { RouterModule } from '@angular/router';
import { sharedPipes } from './pipes';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import 'hammerjs';

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
  ChartsModule,
  SharedModule,
  DateInputsModule,
];

@NgModule({
  declarations: [...components, ...sharedPipes],
  imports: [...modules],
  exports: [...components, ...modules, ...sharedPipes],
  providers: [],
})
export class FeaturesSharedModule {}
