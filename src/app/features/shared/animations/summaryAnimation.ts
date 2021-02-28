import { animate, style, transition, trigger } from '@angular/animations';

export const summaryAnimation = {
  summaryTrigger: trigger('summaryTrigger', [
    transition('void =>   *', [
      style({
        transform: 'translateY(-20px)',
      }),

      animate(250),
    ]),
  ]),
};
