import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DoctorService } from '../services/doctor.service';

import * as moment from 'moment';

import {
  NgbCalendar,
  NgbDateStruct,
  NgbDate,
} from '@ng-bootstrap/ng-bootstrap';
import { Doctor, Slot } from '../models/doctor.model';
import { DateService } from '../services/date.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css'],
})
export class AppointmentFormComponent implements OnInit {
  dateModel: NgbDateStruct;
  nameModel = '';
  phoneModel = '';
  reasonModel = '';

  doctor: Doctor = null;
  isDoctorLoaded = false;
  availableTimeSlots: string[] = [];
  selectedDate = '';
  selectedTimeSlot = 'Select a time';
  isValidTimeSelected = false;
  isFormSubmitted = false;


  isNotAvailable = (date: NgbDate) => {
    let isfound = true;
    if (this.isDoctorLoaded) {
      for (const day of this.doctor.availability.availableDays) {
        if (
          this.calendar.getWeekday(date) ===
          this.dateService.convertWeekdayToNumber(day)
        ) {
          isfound = false;
        }
      }
    }
    return isfound;
    // tslint:disable-next-line: semicolon
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private doctorService: DoctorService,
    private dateService: DateService,
    private calendar: NgbCalendar
  ) {}

  ngOnInit(): void {
    // tslint:disable-next-line: no-string-literal
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

  onSubmit(form: NgForm) {
    this.isFormSubmitted = true;
    const successMsg = `Your appointment request successfully submitted!\n
    Doctor name: ${ this.doctor.name }\n
    Time: ${ this.selectedDate } ${ this.selectedTimeSlot }`;
    alert(successMsg);
    this.router.navigate(['']);
  }

  onDateSelect(date) {
    this.isValidTimeSelected = false;
    this.selectedTimeSlot = 'Select a time';
    const dateString = this.dateService.convertDateToString(date);
    this.selectedDate = dateString;
    const weekDay = moment(dateString, 'DD-MM-YYYY').isoWeekday();
    this.selectedTimeSlot = 'Select a time';
    this.getAvailableSlots(this.dateService.convertWeekdayToString(weekDay));
  }

  onTimeSlotClick(slot) {
    if (this.isValidTime(slot)) {
      this.isValidTimeSelected = true;
      this.selectedTimeSlot = slot;
    }
  }

  private isValidTime(time: string) {
    return moment(time, 'hh:mm A').isValid();
  }

  private getAvailableSlots(weekDay: string) {
    const availableTime: Slot = this.parseSlotRange(
      this.doctor.availability[weekDay]
    );
    const startTime = moment(availableTime.startTime, 'hh:mm A');
    const endTime = moment(availableTime.endTime, 'hh:mm A');
    const duration = moment.duration(15, 'minutes');
    this.availableTimeSlots = [];
    for (
      const currentTime = startTime.clone();
      endTime.diff(currentTime) >= 0;
      currentTime.add(duration)
    ) {
      this.availableTimeSlots.push(currentTime.format('hh:mm A'));
    }
  }

  private parseSlotRange(slotString: string): Slot {
    const slotsString: string[] = slotString.split(' - ');
    return new Slot(slotsString[0], slotsString[1]);
  }
}
