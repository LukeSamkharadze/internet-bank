import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentLimitsComponent } from '../payment-limits/payment-limits.component';
import { SettingsAndMenuComponent } from './settings-and-menu.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsSecurityComponent } from '../settings-security/settings-security.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsAndMenuComponent,
    children: [
      { path: 'general', component: SettingsComponent },
      { path: 'security', component: SettingsSecurityComponent },
      { path: '', redirectTo: 'general', pathMatch: 'full' },
      { path: 'limits', component: PaymentLimitsComponent },

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
