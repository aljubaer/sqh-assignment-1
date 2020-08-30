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

  private formatDoctor(jsonDoctor): Doctor {
    return new Doctor(
      jsonDoctor.name,
      jsonDoctor.org,
      this.formatAvailability(jsonDoctor.availibility),
      jsonDoctor.visitDurationInMin
    );
  }

  private formatAllDoctors(jsonDoctors: any): Doctor[] {
    const doctors: Doctor[] = [];

    jsonDoctors.forEach((jsonDoctor) => {
      const doctor: Doctor = this.formatDoctor(jsonDoctor);
      doctors.push(doctor);
    });

    return doctors;
  }

  public getDoctors() {
    return this.formatAllDoctors(this.fetchDoctors());
  }

  public getDoctorByName(doctorName: string): Promise<Doctor> {
    const doctors: Doctor[] = this.fetchDoctors();

    const filterDoctors: Doctor[] = doctors.map(doctor => {
      if (doctor.name === doctorName) {
        return doctor;
      }
    });

    return new Promise((resolve, reject) => {
      if (filterDoctors.length > 0) {
        resolve(filterDoctors[0]);
      } else {
        reject('No doctor found');
      }
    });
  }
}
