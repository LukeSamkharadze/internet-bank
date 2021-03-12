import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  Input,
  AfterViewInit,
} from '@angular/core';
import { Chart } from 'chart.js';
import { finalize, map } from 'rxjs/operators';
import { IncomeDataType } from './services/data/dataType';
import { GenerateChartService } from './services/chart/generate-chart.service';
import { IncomeDataService } from './services/data/income-data.service';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '@core/alerts/alert.service';

@Component({
  selector: 'app-features-shared-income-chart',
  templateUrl: './income-chart.component.html',
  styleUrls: ['./income-chart.component.scss'],
})
export class IncomeChartComponent implements OnInit, AfterViewInit {
  @Output()
  public isClicked = new EventEmitter<MouseEvent>();
  @Input() monthRange = 0;
  @Input() chartLegend = 'Income';
  @Input() headerLegend = 'Total Income';
  @Input() title = 'Monthly';
  @Input() displayLabel = true;
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  gradientFill: any;
  gradientFill2: any;
  myChart: Chart;
  data: IncomeDataType[];
  color = `unset`;
  totalsum: number;
  constructor(
    private generateChartService: GenerateChartService,
    private incomeDataService: IncomeDataService,
    private authService: AuthService,
    private alertService: AlertService
  ) {
    this.generateChartService.incomeColor
      .pipe(
        map((color) => {
          this.color = color;
        })
      )
      .subscribe();
    this.generateChartService.totalIncome
      .pipe(
        map((sum) => {
          this.totalsum = sum;
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.gradientFill = this.ctx.createLinearGradient(170, 0, 170, 170);
    this.gradientFill.addColorStop(0, 'rgba(255, 171, 43, 0.3)');
    this.gradientFill.addColorStop(1, 'rgba(255, 171, 43, 0)');

    this.gradientFill2 = this.ctx.createLinearGradient(170, 0, 170, 170);
    this.gradientFill2.addColorStop(0, 'rgba(77, 124, 254, 0.3)');
    this.gradientFill2.addColorStop(1, 'rgba(77, 124, 254, 0)');
  }
  ngAfterViewInit() {
    this.incomeChart();
  }
  handleClick(event: MouseEvent) {
    this.isClicked.emit(event);
  }
  incomeChart() {
    this.incomeDataService
      .getAll()
      .pipe(
        map((value) => {
          if (!value[0]) {
            this.alertService.showError('No Data');
          } else {
            for (const user of value) {
              if (user.userId === Number(this.authService.userId)) {
                this.data = [user];
              }
            }
          }
        }),
        finalize(() => {
          this.myChart = this.generateChartService.generateChart(
            this.ctx,
            this.monthRange,
            this.displayLabel,
            this.data
          );
        })
      )
      .subscribe();
  }
}
