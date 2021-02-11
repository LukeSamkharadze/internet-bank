import { NgModule } from '@angular/core';
import { AuthenticationComponent } from './authentication.component';
import { FeaturesSharedModule } from '../shared/features-shared.module';
import { LoginComponent } from './login/login.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';

@NgModule({
  declarations: [AuthenticationComponent, LoginComponent],
  imports: [FeaturesSharedModule, AuthenticationRoutingModule],
  exports: [AuthenticationComponent],
})
export class AuthenticationModule {}
