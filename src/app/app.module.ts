import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { FeaturesSharedModule } from './features/shared/features-shared.module';
import { CoreModule } from '@core/core.module';
@NgModule({
  declarations: [AppComponent],
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
