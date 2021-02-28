import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const formAnimations = {
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

  formTrigger2: trigger('formTrigger2', [
    transition('void =>   *', [
      style({
        transform: 'translateX(30px)',
        opacity: '0',
      }),

      animate(300),
    ]),
  ]),
};
