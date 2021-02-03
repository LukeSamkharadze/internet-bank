import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomeChartComponent } from './income-chart/income-chart.component';
import { IncomeDataService } from './income-chart/services/data/income-data.service';
import { GenerateChartService } from './income-chart/services/chart/generate-chart.service';

@NgModule({
  declarations: [IncomeChartComponent],
  imports: [CommonModule],
  providers: [IncomeDataService, GenerateChartService],
})
export class FeaturesSharedModule {}
