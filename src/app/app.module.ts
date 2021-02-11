import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { FeaturesSharedModule } from './features/shared/features-shared.module';
import { CoreModule } from '@core/core.module';
import { DashboardComponent } from './features/dashboard/dashboard.component';
@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    SharedModule,
    FeaturesSharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
