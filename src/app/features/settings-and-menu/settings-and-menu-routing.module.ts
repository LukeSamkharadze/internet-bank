import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsAndMenuComponent } from './settings-and-menu.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsAndMenuComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsAndMenuRouting {}
