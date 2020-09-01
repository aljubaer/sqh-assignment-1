import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../services/doctor.service';

import * as moment from 'moment';

import {
  NgbCalendar,
  NgbDateStruct,
  NgbDate,
} from '@ng-bootstrap/ng-bootstrap';
import { Doctor, Slot } from '../models/doctor.model';
import { DateService } from '../services/date.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css'],
})
export class AppointmentFormComponent implements OnInit {
  dateModel: NgbDateStruct;

  doctor: Doctor = null;
  isDoctorLoaded = false;
  availableTimeSlots: string[] = [];
  selectedTimeSlot = 'Select a time';

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
    private doctorService: DoctorService,
    private dateService: DateService,
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

  onDateSelect(date) {
    const dateString = this.dateService.convertDateToString(date);
    console.log(dateString);
    const weekDay = moment(dateString, 'DD-MM-YYYY').isoWeekday();
    console.log(weekDay);
    this.selectedTimeSlot = 'Select a time';
    this.getAvailableSlots(this.dateService.convertWeekdayToString(weekDay));
  }

  onTimeSlotClick(slot) {
    this.selectedTimeSlot = slot;
  }

  private getAvailableSlots(weekDay: string) {
    console.log(weekDay);
    const availableTime: Slot = this.parseSlotRange(
      this.doctor.availability[weekDay]
    );
    console.log(availableTime);
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
