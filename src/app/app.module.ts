import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { FeaturesSharedModule } from './features/shared/features-shared.module';
import { CoreModule } from '@core/core.module';
<<<<<<< HEAD
import { SharedModule } from './shared/shared.module';
import { SettingsSecurityComponent } from './features/settings-security/settings-security.component';
import{ReactiveFormsModule} from '@angular/forms'

@NgModule({
  declarations: [AppComponent, SettingsSecurityComponent],
  imports: [BrowserModule, CoreModule, AppRoutingModule,SharedModule,ReactiveFormsModule],
=======
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    FeaturesSharedModule,
  ],
>>>>>>> 41294d258f81b10be3745218674a44754708276e
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
