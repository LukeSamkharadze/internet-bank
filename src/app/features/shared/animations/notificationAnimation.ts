import { animate, style, transition, trigger } from '@angular/animations';

export const slideInOutTimeout = 300;

export const slideInOut = trigger('slideInOut', [
  transition(':enter', [
    style({ transform: 'translateX(200px)', opacity: '0' }),
    animate('500ms cubic-bezier(.16,.52,0,1.14)'),
  ]),
  transition(':leave', [
    animate(
      '500ms cubic-bezier(.16,.52,0,1.14)',
      style({
        transform: 'translateX(200px)',
        height: 0,
        'margin-bottom': '0px',
        opacity: '0',
      })
    ),
  ]),
]);
