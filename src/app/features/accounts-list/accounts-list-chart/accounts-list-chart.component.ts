import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormatterService } from '../../shared/services/formatter.service';
import IItem from '../models/chart-item.interface';
import { AccountsListChartService } from '../services/accounts-list-chart.service';

@Component({
  selector: 'app-accounts-list-chart',
  templateUrl: './accounts-list-chart.component.html',
  styleUrls: ['./accounts-list-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsListChartComponent
  implements AfterViewInit, OnDestroy, OnInit {
  @Input() info$: Observable<IItem>;
  @ViewChild('chart', { static: true })
  chartCanvas: ElementRef<HTMLCanvasElement>;

  amount$: Observable<string>;
  arrow$: Observable<string>;
  color$: Observable<string>;
  title$: Observable<string>;

  subscription: Subscription;

  constructor(
    public chartService: AccountsListChartService,
    private formatService: FormatterService
  ) {}

  ngOnInit(): void {
    this.amount$ = this.info$.pipe(
      map((info) =>
        this.formatService.formatBalance(info.value, {
          currency: '$',
        })
      )
    );
    this.title$ = this.info$.pipe(map((info) => info.title));
    const data$ = this.info$.pipe(map((info) => info.data));
    this.arrow$ = data$.pipe(
      map((data) =>
        this.chartService.isRed(data)
          ? 'las la-long-arrow-alt-down'
          : 'las la-long-arrow-alt-up'
      )
    );
    this.color$ = data$.pipe(
      map((data) => {
        if (this.chartService.isGreen(data)) {
          return 'green';
        } else if (this.chartService.isYellow(data)) {
          return 'orange';
        } else {
          return 'pink';
        }
      })
    );
  }

  ngAfterViewInit() {
    this.subscription = this.info$.subscribe((info) =>
      this.chartService.createChart(this.chartCanvas.nativeElement, info.data)
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
