import { NgModule } from '@angular/core';
import { FeaturesSharedModule } from '@features/shared';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoverComponent } from './recover/recover.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, RecoverComponent],
  imports: [FeaturesSharedModule, AuthenticationRoutingModule],
  providers: [],
})
export class AuthenticationModule {}
