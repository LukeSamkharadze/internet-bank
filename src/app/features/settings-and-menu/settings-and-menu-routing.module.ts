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
