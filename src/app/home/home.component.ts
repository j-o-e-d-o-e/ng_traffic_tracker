import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgbDate, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {PlaneService} from '../service/plane.service';
import {environment} from '../../environments/environment';
import {Day} from '../model/day.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../app.component.css']
})
export class HomeComponent implements OnInit {
  model: NgbDateStruct;
  minDate: NgbDate;
  maxDate: NgbDate;
  startDepartures: Date;
  loading: boolean;

  constructor(private service: PlaneService, private router: Router) {
  }

  ngOnInit(): void {
    this.minDate = new NgbDate(environment.startYear, environment.startMonth, environment.startDay);
    this.startDepartures = new Date(environment.departuresStartDate);
    this.service.fetchDay().subscribe((day: Day) => {
      const date = new Date(day.now);
      this.maxDate = new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
      this.model = this.maxDate;
      this.loading = false;
    });
    this.loading = true;
  }

  onClick() {
    const date = this.model.year + '-'
      + ('0' + this.model.month).slice(-2) + '-'
      + ('0' + this.model.day).slice(-2);
    this.router.navigate(['/day', date]).catch();
  }
}
