import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from '@core/core.module';
import { SharedModule } from './shared/shared.module';
import { SettingsSecurityComponent } from './features/settings-security/settings-security.component';
import{ReactiveFormsModule} from '@angular/forms'

@NgModule({
  declarations: [AppComponent, SettingsSecurityComponent],
  imports: [BrowserModule, CoreModule, AppRoutingModule,SharedModule,ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
