import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DoctorService } from '../services/doctor.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {

  constructor(private route: ActivatedRoute, private doctorService: DoctorService) { }

  ngOnInit(): void {
    const doctorName = this.route.snapshot.params['name'];
    console.log(doctorName);
    this.loadDoctor(doctorName)
  }

  async loadDoctor(doctorName) {
    try {
      const doctor = await this.doctorService.getDoctorByName(doctorName);
      console.log(doctor);
    } catch (error) {
      console.log(error);
    }
  }

}
