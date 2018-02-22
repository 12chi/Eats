import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewrestComponent } from './newrest/newrest.component';
import { EditrestComponent } from './editrest/editrest.component';
import { AllrestComponent } from './allrest/allrest.component';
import { AllreviewsComponent } from './allreviews/allreviews.component';
import { NewreviewsComponent } from './newreviews/newreviews.component';


const routes: Routes = [
  { path: 'new', component: NewrestComponent },
  { path: 'edit/:id', component: EditrestComponent },
  { path: 'write/:id', component: NewreviewsComponent },
  { path: 'reviews/:id', component: AllreviewsComponent },
  { path: 'home', component: AllrestComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
