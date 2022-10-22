import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PurposeComponent } from './purpose/purpose.component';

const routes: Routes = [
  { path: 'purpose', component: PurposeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
