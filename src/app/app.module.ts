import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorCardComponent } from './doctor-card/doctor-card.component';

@NgModule({
  declarations: [
    AppComponent,
    DoctorListComponent,
    DoctorCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
