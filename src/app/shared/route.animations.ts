import {
  trigger,
  transition,
  style,
  query,
  group,
  animate,
} from '@angular/animations';

export const slider = trigger('routeAnimation', [
  transition('* => home', slideTo('left')),
  transition('* => login', slideTo('right')),
  transition('* => registration', slideTo('right')),
  transition('* => todos', slideTo('right')),
  transition('* => active', slideTo('right')),
  transition('* => archive', slideTo('right')),
  transition('* => done', slideTo('right')),
]);

function slideTo(direction) {
  const optional = { optional: true };
  return [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          [direction]: 0,
          width: '100%',
        }),
      ],
      optional,
    ),
    query(':enter', [style({ [direction]: '-100%' })]),
    group([
      query(
        ':leave',
        [animate('600ms ease', style({ [direction]: '100%' }))],
        optional,
      ),
      query(':enter', [animate('600ms ease', style({ [direction]: '0%' }))]),
    ]),
  ];
}
