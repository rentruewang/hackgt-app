import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { PurposeComponent } from './purpose/purpose.component';
import { AboutComponent } from './about/about.component';
import { WordcloudComponent } from './wordcloud/wordcloud.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'purpose', component: PurposeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'wordcloud', component: WordcloudComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
