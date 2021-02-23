import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SettingsSecurityComponent } from './features/settings-security/settings-security.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@shared/shared';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '@core/core.module';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { ApplicationComponent } from './features/application/application.component';
import { FeaturesSharedModule } from '@features/shared';
import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    SettingsSecurityComponent,
    DashboardComponent,
    PageNotFoundComponent,
    ApplicationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    RouterModule,
    FeaturesSharedModule,
    SharedModule,
    ChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
