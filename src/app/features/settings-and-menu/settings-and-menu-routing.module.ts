import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsAndMenuComponent } from './settings-and-menu.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsAndMenuComponent,
    children: [
      { path: 'general', component: SettingsComponent },

      // enter your paths here
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsAndMenuRouting {}
