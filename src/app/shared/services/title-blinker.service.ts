import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class TitleBlinkerService {
  private timeout;

  constructor(private title: Title) {}

  blink(msg: string): void {
    const prevTitle = this.title.getTitle();

    const step = () => {
      const newTitle = this.title.getTitle() === prevTitle ? msg : prevTitle;

      this.title.setTitle(newTitle);

      if (!document.hasFocus()) {
        this.timeout = setTimeout(step.bind(this), 500);
      } else {
        this.title.setTitle(prevTitle);
      }
    };

    clearTimeout(this.timeout);
    step();
  }
}
