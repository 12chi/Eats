import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NewrestComponent } from './newrest/newrest.component';
import { EditrestComponent } from './editrest/editrest.component';
import { AllrestComponent } from './allrest/allrest.component';
import { AllreviewsComponent } from './allreviews/allreviews.component';
import { NewreviewsComponent } from './newreviews/newreviews.component';




@NgModule({
  declarations: [
    AppComponent,
    NewrestComponent,
    EditrestComponent,
    AllrestComponent,
    AllreviewsComponent,
    NewreviewsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
