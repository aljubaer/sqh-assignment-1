import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  public convertWeekdayToNumber(day: string): number {
    // tslint:disable: object-literal-key-quotes
    const weekDaysMap = {
      'mon': 1,
      'tue': 2,
      'wed': 3,
      'thu': 4,
      'fri': 5,
      'sat': 6,
      'sun': 7,
      'monday': 1,
      'tueday': 2,
      'wednesday': 3,
      'thusday': 4,
      'friday': 5,
      'satday': 6,
      'sunday': 7,
    };
    return weekDaysMap[day];
  }

  public convertWeekdayToString(day: number): string {
    const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    return weekDays[day - 1];
  }

  public convertDateToString(date): string {
    return `${date.day}-${date.month}-${date.year}`;
  }

}
