import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DoctorService } from '../services/doctor.service';

import {
  NgbCalendar,
  NgbDateStruct,
  NgbDate,
} from '@ng-bootstrap/ng-bootstrap';
import { Doctor } from '../models/doctor.model';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css'],
})
export class AppointmentFormComponent implements OnInit {
  model: NgbDateStruct;

  doctor: Doctor = null;
  isDoctorLoaded = false;

  isNotAvailable = (date: NgbDate) => {
    const weekDaysMap = {
      'mon': 1,
      'tue': 2,
      'wed': 3,
      'thu': 4,
      'fri': 5,
      'sat': 6,
      'sun': 7,
    };
    let isfound = true;
    if (this.isDoctorLoaded) {
      for (const day of this.doctor.availability.availableDays){
        if (this.calendar.getWeekday(date) === weekDaysMap[day]){
          isfound = false;
        }
      }
    }
    return isfound;
  }

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private calendar: NgbCalendar
  ) {}

  ngOnInit(): void {
    const doctorName = this.route.snapshot.params['name'];
    console.log(doctorName);
    this.loadDoctor(doctorName);
  }

  async loadDoctor(doctorName) {
    try {
      const doctor = await this.doctorService.getDoctorByName(doctorName);
      console.log(doctor);
      this.doctor = doctor;
      this.isDoctorLoaded = true;
    } catch (error) {
      console.log(error);
    }
  }
}
