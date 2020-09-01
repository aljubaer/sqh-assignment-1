import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { Doctor } from '../models/doctor.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css'],
})
export class DoctorListComponent implements OnInit {
  doctors: Doctor[] = [];

  constructor(private doctorService: DoctorService, private router: Router) {}

  ngOnInit(): void {
    this.getAllDoctors();
  }

  getAllDoctors(): any {
    this.doctors = this.doctorService.getDoctors();
  }

  onDoctorSelect(doctor: Doctor) {
    this.router.navigate(['/appointment', doctor.name]);
  }
}
