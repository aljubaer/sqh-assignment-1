import { Injectable } from '@angular/core';
import { Doctor } from '../models/doctor.model';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor() {}

  private fetchDoctors() {
    return require('../data/data.json');
  }

  private formatAvailability(availability: any) {
    return {
      numberOfAvailableDaysInWeek: Object.keys(availability).length,
      availableDays: Object.keys(availability),
      ...availability,
    };
  }

  private formatDoctors(jsonDoctors: any): Doctor[] {
    const doctors: Doctor[] = [];

    jsonDoctors.forEach((jsonDoctor) => {
      const doctor: Doctor = new Doctor(
        jsonDoctor.name,
        jsonDoctor.org,
        this.formatAvailability(jsonDoctor.availibility),
        jsonDoctor.visitDurationInMin
      );
      console.log(doctor);
      doctors.push(doctor);
    });

    return doctors;
  }

  public getDoctors() {
    return this.formatDoctors(this.fetchDoctors());
  }
}