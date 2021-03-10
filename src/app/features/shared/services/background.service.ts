import { Injectable } from '@angular/core';
import IBgColor from '../interfaces/background-color.interface';

@Injectable({
  providedIn: 'root',
})
export class BackgroundService {
  private readonly BACKGROUND_DIRECTORY = './assets/cards/backgrounds/';

  getBackground(color: IBgColor): string {
    return this.BACKGROUND_DIRECTORY + (color || 'orange') + '.svg';
  }
}
