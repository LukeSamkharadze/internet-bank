import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentLimitsComponent } from '../payment-limits/payment-limits.component';
import { SettingsNotificationComponent } from '../shared/components/settings-notification/settings-notification.component';
import { SettingsAndMenuComponent } from './settings-and-menu.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsAndMenuComponent,
    children: [
      { path: 'general', component: SettingsComponent },
      { path: 'limits', component: PaymentLimitsComponent },
      { path: 'notifications', component: SettingsNotificationComponent },

      { path: '', redirectTo: 'general' },
      { path: '**', redirectTo: 'general' },
      // enter your paths here
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class SettingsAndMenuRouting {}
