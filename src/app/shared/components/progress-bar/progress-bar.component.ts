import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-shared-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit, OnChanges {
  @Input()
  public value = 0;

  @Input()
  public max = 100;

  private colorRed = [255, 0, 0];
  private colorRedOrange = [255, 160, 122];
  private colorOrange = [255, 165, 0];
  private colorBlue = [65, 105, 225];
  private colorLightBlue = [65, 105, 225];
  private colorLightGreen = [189, 255, 177];
  private colorGreen = [57, 255, 20];

  private firstBreakP = 0.26;
  private secondBreakP = 0.61;
  private thirdBreakP = 0.81;

  ngOnInit(): void {
    this.defineColor();
  }

  ngOnChanges(): void {
    this.defineColor();
  }
  pickHex(color1, color2, weight) {
    const p = weight;
    const w = p * 2 - 1;
    const w1 = (w / 1 + 1) / 2;
    const w2 = 1 - w1;
    const rgb = [
      Math.round(color1[0] * w1 + color2[0] * w2),
      Math.round(color1[1] * w1 + color2[1] * w2),
      Math.round(color1[2] * w1 + color2[2] * w2),
    ];
    return rgb;
  }

  defineColor() {
    const coefficient = this.value / this.max;
    let color;
    color = 'black';
    if (coefficient < this.firstBreakP) {
      color = this.pickHex(
        this.colorRed,
        this.colorRedOrange,
        1 - coefficient / this.firstBreakP
      );
    } else if (
      coefficient >= this.firstBreakP &&
      coefficient < this.secondBreakP
    ) {
      color = this.pickHex(
        this.pickHex(
          this.colorRedOrange,
          this.colorOrange,
          1 -
            (coefficient - this.firstBreakP) /
              (this.secondBreakP - this.firstBreakP)
        ),
        this.pickHex(
          this.colorOrange,
          this.colorLightBlue,
          1 - coefficient / this.secondBreakP
        ),
        1 -
          (coefficient - this.firstBreakP) /
            (this.secondBreakP - this.firstBreakP)
      );
    } else if (
      coefficient >= this.secondBreakP &&
      coefficient < this.thirdBreakP
    ) {
      color = this.pickHex(
        this.pickHex(
          this.colorLightBlue,
          this.colorBlue,
          1 -
            (coefficient - this.secondBreakP) /
              (this.thirdBreakP - this.secondBreakP)
        ),
        this.pickHex(
          this.colorBlue,
          this.colorLightGreen,
          1 -
            (coefficient - this.secondBreakP) /
              (this.thirdBreakP - this.secondBreakP)
        ),
        1 -
          (coefficient - this.secondBreakP) /
            (this.thirdBreakP - this.secondBreakP)
      );
    } else {
      color = this.pickHex(
        this.colorLightGreen,
        this.colorGreen,
        1 - (coefficient - this.thirdBreakP) / (1 - this.thirdBreakP)
      );
    }
    color = 'rgb(' + color.toString() + ')';
    return color;
  }
  public styleObject() {
    return {
      backgroundColor: this.defineColor(),
      width: (this.value * 100) / this.max + '%',
    };
  }
}
