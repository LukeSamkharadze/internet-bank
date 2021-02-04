import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from '@core/core.module';
import { AccountsListComponent } from './features/accounts-list/accounts-list.component';
import { AccountsListChartComponent } from './features/accounts-list/accounts-list-chart/accounts-list-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountsListComponent,
    AccountsListChartComponent,
  ],
  imports: [BrowserModule, CoreModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
