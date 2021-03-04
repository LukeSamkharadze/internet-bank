import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsNotificationComponent } from './settings-notification.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsNotificationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsNotificationRoutingModule {}
