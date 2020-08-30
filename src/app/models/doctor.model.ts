export class Doctor {
  name: string;
  org: string;
  availability: any;
  visitDurationInMin: number;

  constructor(name, org, availability, visitDurationInMin) {
    this.name = name;
    this.org = org;
    this.availability = availability;
    this.visitDurationInMin = visitDurationInMin;
  }
}
