import {Component, OnInit} from '@angular/core';
import {PlaneService} from '../../service/plane.service';
import {PlanesList} from '../../model/planes-list.model';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {Day} from '../../model/day.model';

@Component({
  selector: 'app-planes-list',
  templateUrl: './planes-list.component.html',
  styleUrls: ['./planes-list.component.css', '../../app.component.css']
})
export class PlanesListComponent implements OnInit {
  planes: PlanesList;
  loading: boolean;
  departureInfo: boolean;
  airlinesStartDate: number = new Date(environment.airlinesStartDate).setHours(0, 0, 0, 0);
  airlinesInfo: boolean;

  constructor(private service: PlaneService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.loading = true;
    this.service.fetch(environment.urlBase + '/' + this.route.snapshot.params.date).subscribe(
      (planes: PlanesList) => {
        this.setData(planes);
        this.service.fetch(environment.urlBase + '/day/' + this.route.snapshot.params.date).subscribe((day: Day) => {
            this.departureInfo = day.airports.length > 0;
            this.loading = false;
          },
          () => this.router.navigate(['/error']).catch());
      },
      () => this.router.navigate(['/error']).catch());
  }

  private setData(planes: PlanesList) {
    this.planes = planes;
    this.airlinesInfo = this.airlinesStartDate <= new Date(this.planes._embedded.planeDtoes[0].date).setHours(0, 0, 0, 0);
  }

  onPrev() {
    this.service.fetch(this.planes._links.prev.href).subscribe(
      (planes: PlanesList) => {
        this.setData(planes);
      });
  }

  onNext() {
    this.service.fetch(this.planes._links.next.href).subscribe(
      (planes: PlanesList) => {
        this.setData(planes);
      });
  }

  onLast() {
    this.service.fetch(this.planes._links.last.href).subscribe(
      (planes: PlanesList) => {
        this.setData(planes);
      });
  }

  onDay() {
    this.router.navigate(['/day', this.planes._embedded.planeDtoes[0].date]).catch();
  }

  onIcao(icao: string) {
    this.router.navigate(['/details', icao]).catch();
  }
}
