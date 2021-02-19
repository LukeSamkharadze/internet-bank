import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FeaturesSharedModule } from './features/shared/features-shared.module';
import { CoreModule } from '@core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SettingsSecurityComponent } from './features/settings-security/settings-security.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, DashboardComponent, SettingsSecurityComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    FeaturesSharedModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
