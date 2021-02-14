import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';
import IFilledArray from '../models/filled-array.entity';

@Injectable()
export class AccountsListChartService {
  createChart(canvas: HTMLCanvasElement, data: IFilledArray<number>): any {
    const dataCopy = Array.from(data);

    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
    const ctx = canvas.getContext('2d');

    const chartContainer = canvas.parentElement;
    const { 0: color, 1: bg } = (
      window
        .getComputedStyle(chartContainer)
        .backgroundImage.match(/rgba\( *(\d+ *, *){3}\d+(.\d+)? *\)/g) ?? []
    ).map((rgba) => this.rgbaToRgb(rgba));
    canvas.style.backgroundImage = window.getComputedStyle(
      chartContainer
    ).backgroundImage;
    chartContainer.style.background = 'none';

    const max = dataCopy.reduce((prev, cur) => Math.max(prev, cur));
    dataCopy.forEach((val, index) => (dataCopy[index] = max - val));

    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: dataCopy,
        datasets: [
          {
            borderColor: color,
            backgroundColor: bg,
            pointRadius: 0,
            borderWidth: 1.5,
            data: dataCopy,
          },
        ],
        fill: false,
      },

      options: {
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              display: false,
              ticks: {
                max,
              },
            },
          ],
          xAxes: [
            {
              display: false,
            },
          ],
        },
        tooltips: {
          enabled: false,
        },
      },
    });
  }

  rgbaToRgb(rgba: string): string {
    return (
      'rgb(' +
      (rgba.match(/\d+ *,/g) ?? ['255,', '255,', '255,'])
        .join('')
        .slice(0, -1) +
      ')'
    );
  }

  getIncreaseRate(data: IFilledArray<number>): number {
    const len = data.length;
    const fullAverage = (data[len - 1] - data[0]) / len;
    const lastAverage = (data[len - 1] - data[len - 2]) / 2;
    return (lastAverage / (fullAverage || 1)) * (lastAverage < 0 ? -1 : 1);
  }

  isGreen(data: IFilledArray<number>): boolean {
    return this.getIncreaseRate(data) > 1.5;
  }

  isYellow(data: IFilledArray<number>): boolean {
    return this.getIncreaseRate(data) >= 0 && !this.isGreen(data);
  }

  isRed(data: IFilledArray<number>): boolean {
    return !this.isYellow(data) && !this.isGreen(data);
  }
}
