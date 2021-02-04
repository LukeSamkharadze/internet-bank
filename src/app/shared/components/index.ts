import { InputComponent } from './input/input.component';
import { HeaderProfileComponent } from './../../features/shared/header-profile/header-profile.component';
import { TextareaComponent } from './textarea/textarea.component';
import { TagComponent } from './tag/tag.component';
import { ButtonComponent } from './button/button.component';

export * from './input/input.component';
export * from './textarea/textarea.component';
export * from './tag/tag.component';
export * from './button/button.component';

export const components = [
  InputComponent,
  TextareaComponent,
  TagComponent,
  ButtonComponent,
  HeaderProfileComponent,
];
