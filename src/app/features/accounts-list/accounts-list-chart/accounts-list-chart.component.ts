import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import IItem from '../models/chart-item.entity';
import { AccountsListChartService } from '../services/accounts-list-chart.service';

@Component({
  selector: 'app-accounts-list-chart',
  templateUrl: './accounts-list-chart.component.html',
  styleUrls: ['./accounts-list-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsListChartComponent implements AfterViewInit {
  @Input() info: IItem;
  @ViewChild('chart', { static: true }) chartCanvas: ElementRef<
    HTMLCanvasElement
  >;

  constructor(public chartService: AccountsListChartService) {}

  ngAfterViewInit() {
    this.chartService.createChart(
      this.chartCanvas.nativeElement,
      this.info.data
    );
  }

  getAmount(): string {
    return this.info.data[this.info.data.length - 1]
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, '.');
  }

  getArrowClass(): string {
    return this.chartService.isRed(this.info.data)
      ? 'las la-long-arrow-alt-down'
      : 'las la-long-arrow-alt-up';
  }

  getColorClass(): string {
    return this.chartService.isGreen(this.info.data)
      ? 'green'
      : this.chartService.isYellow(this.info.data)
      ? 'orange'
      : 'pink';
  }
}
