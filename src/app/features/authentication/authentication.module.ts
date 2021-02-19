import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoverComponent } from './recover/recover.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { FeaturesSharedModule } from '@features/shared';
import { UserService } from '../shared/services/user.service';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, RecoverComponent],
  imports: [AuthenticationRoutingModule, FeaturesSharedModule],
  providers: [],
})
export class AuthenticationModule {}
