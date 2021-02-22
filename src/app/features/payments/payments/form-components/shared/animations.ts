import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const animations = {
  errorTrigger: trigger('errorTrigger', [
    state(
      'show',
      style({
        opacity: 1,
      })
    ),

    transition('void =>   *', [
      style({
        opacity: 0,
        transform: 'translateY(-8px)',
      }),

      animate(250),
    ]),
  ]),

  formTrigger: trigger('formTrigger', [
    transition('void =>   *', [
      style({
        transform: 'translateX(-30px)',
        opacity: '0',
      }),

      animate(300),
    ]),
  ]),
};

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
