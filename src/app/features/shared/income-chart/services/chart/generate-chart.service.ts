import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenerateChartService {
  incomeColor: BehaviorSubject<string> = new BehaviorSubject(`unset`);
  totalIncome: BehaviorSubject<number> = new BehaviorSubject(0);
  constructor() {}
  generateChart(ctx, dataservice) {
    const dataset: {}[] = [];
    let sum = 0;
    for (let i = 0; i < dataservice.length; i++) {
      const red = Math.floor(Math.random() * (255 - 1) + 1);
      const green = Math.floor(Math.random() * (255 - 1) + 1);
      const blue = Math.floor(Math.random() * (255 - 1) + 1);
      const color1 = `rgba(${red},${green},${blue},1)`;
      const color0 = `rgba(${red},${green},${blue},0)`;
      const color05 = `rgba(${red},${green},${blue},0.5)`;
      const color03 = `rgba(${red},${green},${blue},0.3)`;
      if (i === 0) {
        this.incomeColor.next(color1);
        sum = dataservice[i].data.reduce((acc, val) => {
          return acc + val;
        }, 0);
        this.totalIncome.next(sum);
      }
      const gradientFill = ctx.createLinearGradient(170, 0, 170, 170);
      gradientFill.addColorStop(0, color03);
      gradientFill.addColorStop(1, color0);
      dataset.push({
        borderColor: color1,
        backgroundColor: gradientFill,
        pointBackgroundColor: color0,
        pointBorderColor: color0,
        pointRadius: [3, 3, 3, 3, 3, 3],
        pointHoverRadius: 5,
        pointHoverBorderWidth: 7,
        borderWidth: 1.5,
        pointHoverBorderColor: color05,
        pointHoverBackgroundColor: color1,
        data: dataservice[i].data,
      });
    }
    return new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',
      // The data for our dataset
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul'],
        datasets: dataset,
        fill: false,
      },

      // Configuration options go here
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                display: false,
                max: 60000,
              },
              gridLines: {
                display: false,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontSize: 14,
                fontStyle: 'normal',
                fontFamily: `'Roboto', sans-serif`,
                fontColor: '#252631',
              },
              gridLines: {
                borderDash: [2, 2],
              },
            },
          ],
        },
        tooltips: {
          titleFontSize: 13,
          bodyFontSize: 14,
          titleFontStyle: 300,
          titleFontColor: '#252631',
          displayColors: false,
          backgroundColor: 'rgb(255,255,255)',
          bodyFontColor: '#252631',
          bodyFontStyle: 'bold',
          xPadding: 10,
          yPadding: 10,
          callbacks: {
            title(tooltipItem, chart) {
              switch (tooltipItem[0].label) {
                case 'Jan':
                  return 'January';
                case 'Feb':
                  return 'February';
                case 'Mar':
                  return 'March';
                case 'Apr':
                  return 'April';
                case 'Jun':
                  return 'June';
                case 'Jul':
                  return 'July';
              }
            },
            label(tooltipItem, data) {
              return (
                '$ ' +
                Number(tooltipItem.yLabel)
                  .toFixed(0)
                  .replace(/./g, (c, i, a) => {
                    return i > 0 && c !== '.' && (a.length - i) % 3 === 0
                      ? ',' + c
                      : c;
                  })
              );
            },
          },
        },
      },
    });
  }
}
