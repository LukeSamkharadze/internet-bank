import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;

  const createComponent = createComponentFactory({
    component: AppComponent,
    mocks: [Router],
    shallow: true,
    componentMocks: [],
    imports: [],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('Should create component', () => {
    expect(spectator.component).toBeDefined();
  });
});
