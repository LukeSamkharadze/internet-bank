import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '@core/core.module';
import { PageNotFoundComponent } from './page-not-found.component';
import { ApplicationComponent } from './features/application/application.component';
import { FeaturesSharedModule } from '@features/shared';
import { AppRoutingModule } from './app-routing.module';
import 'hammerjs';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, ApplicationComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    FeaturesSharedModule,
    DateInputsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
