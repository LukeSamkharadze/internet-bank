import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { SeriesHighlight } from '@progress/kendo-angular-charts';
import { Expanses } from '../../interfaces/expanses.interface';

@Component({
  selector: 'app-features-shared-expanses',
  templateUrl: './expanses.component.html',
  styleUrls: ['./expanses.component.scss'],
})
export class ExpansesComponent implements OnInit {
  @Input() chartData: Expanses[] = [];
  @Input() header = `Expanses categories`;
  @Output()
  @ViewChild('series')
  series: ElementRef;
  public isClicked = new EventEmitter<MouseEvent>();
  public seriesHighlight: SeriesHighlight = {
    color: '#4D7CFE',
    opacity: 1,
  };

  ngOnInit(): void {
    if (this.chartData.length !== 0) {
      let sum = 0;
      this.chartData.map((item) => {
        if (!item.colorString) {
          const red = Math.floor(Math.random() * 255);
          const green = Math.floor(Math.random() * 255);
          const blue = Math.floor(Math.random() * 255);
          const color = `rgb(${red},${green},${blue})`;
          Object.assign(item, { colorString: color });
        }
        sum += item.share;
      });
      this.chartData.map((item) => {
        Object.assign(item, {
          percent: Math.round((item.share / sum) * 100) + '%',
        });
      });
    } else {
      confirm('No Chart Data !');
    }
  }
  labelContent(e: any): string {
    return e.category;
  }
  handleClick(event: MouseEvent) {
    this.isClicked.emit(event);
  }
}
