import { animate, style, transition, trigger } from '@angular/animations';

export const fadeInOutTimeout = 300;

export const fadeInOut = trigger('fadeInOut', [
  transition('void => *', [style({ opacity: '0' }), animate(fadeInOutTimeout)]),
  transition('* => void', [animate(fadeInOutTimeout, style({ opacity: '0' }))]),
  transition('* => *', [
    style({ opacity: '0' }),
    animate(fadeInOutTimeout, style({ opacity: '1' })),
  ]),
]);
