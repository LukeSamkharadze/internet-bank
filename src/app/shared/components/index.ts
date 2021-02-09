import { InputComponent } from './input/input.component';
import { ProgressBarsComponent } from './progress-bars/progress-bars.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { TextareaComponent } from './textarea/textarea.component';
import { TagComponent } from './tag/tag.component';
import { ButtonComponent } from './button/button.component';
import { LayoutComponent } from './layout/layout.component';
import { ToggleComponent } from './toggle/toggle.component';

export * from './input/input.component';
export * from './textarea/textarea.component';
export * from './tag/tag.component';
export * from './button/button.component';
export * from './checkbox/checkbox.component';
export * from './layout/layout.component';
export * from './toggle/toggle.component';
export * from './progress-bars/progress-bars.component';

export const components = [
  InputComponent,
  TextareaComponent,
  TagComponent,
  ButtonComponent,
  ProgressBarsComponent,
  CheckboxComponent,
  LayoutComponent,
  ToggleComponent,
];
