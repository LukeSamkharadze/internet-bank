import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';

export const listAnimation = trigger('listAnimation', [
  transition('* => *', [
    query(
      ':enter',
      [
        style({ opacity: 0 }),
        stagger('60ms', animate('1s ease-out', style({ opacity: 1 }))),
      ],
      { optional: true }
    ),
  ]),
]);
