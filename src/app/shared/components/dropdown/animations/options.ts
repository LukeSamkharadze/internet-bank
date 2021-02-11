import { trigger, transition, style, animate } from '@angular/animations';

export let optionsAnimation = trigger('openClose', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-20px)' }),
    animate('200ms ease-out'),
  ]),
  transition(':leave', [
    animate(
      '200ms ease-in',
      style({ opacity: 0, transform: 'translateY(-20px)' })
    ),
  ]),
]);
