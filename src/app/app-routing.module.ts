import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';


const routes: Routes = [
  { path: '', redirectTo: 'doctor-list', pathMatch: 'full' },
  { path: 'doctor-list', component: DoctorListComponent },
  { path: 'appointment/:name', component: AppointmentFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
