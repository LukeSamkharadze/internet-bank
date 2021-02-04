import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import IItem from '../models/chart-item.entity';
import { AccountsListChartService } from '../services/accounts-list-chart.service';

@Component({
  selector: 'app-accounts-list-chart',
  templateUrl: './accounts-list-chart.component.html',
  styleUrls: ['./accounts-list-chart.component.scss'],
})
export class AccountsListChartComponent implements OnInit, AfterViewInit {
  @Input() info: IItem;
  @ViewChild('chart', { static: true }) chartCanvas: ElementRef<
    HTMLCanvasElement
  >;

  constructor(private chartService: AccountsListChartService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.chartService.createChart(
      this.chartCanvas.nativeElement,
      this.info.data
    );
  }

  get amount(): string {
    return this.info.data[this.info.data.length - 1]
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, '.');
  }

  get isGreen(): boolean {
    return this.chartService.getIncreaseRate(this.info.data) > 0.15;
  }

  get isYellow(): boolean {
    return (
      this.chartService.getIncreaseRate(this.info.data) >= 0 && !this.isGreen
    );
  }

  get isRed(): boolean {
    return !this.isYellow && !this.isGreen;
  }
}
