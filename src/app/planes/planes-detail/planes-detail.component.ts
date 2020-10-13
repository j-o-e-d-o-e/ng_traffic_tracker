import {Component, OnInit} from '@angular/core';
import {Plane, PlanesList} from '../../model/planes-list.model';
import {PlaneService} from '../../service/plane.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-plane',
  templateUrl: './planes-detail.component.html',
  styleUrls: ['./planes-detail.component.css', '../../app.component.css']
})
export class PlanesDetailComponent implements OnInit {
  planes: PlanesList;
  loading: boolean;
  departureStartDate: number = new Date(environment.departuresStartDate).setHours(0, 0, 0, 0);
  airline: string;
  airlinesStartDate: number = new Date(environment.airlinesStartDate).setHours(0, 0, 0, 0);
  airlinesInfo: boolean;

  constructor(private service: PlaneService, private route: ActivatedRoute, private location: Location, private router: Router) {
  }

  ngOnInit() {
    this.loading = true;
    this.service.fetch(environment.urlBase + '/icao24/' + this.route.snapshot.params.icao).subscribe(
      (planes: PlanesList) => {
        this.setData(planes);
        const latest = this.planes._embedded.planeDtoes[0];
        this.airline = latest.airline_name ? latest.airline_name + ' (' + latest.airline + ')' : latest.airline;
        this.loading = false;
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

  onBack() {
    this.location.back();
  }

  onDay(date: string) {
    this.router.navigate(['/day', date]).catch();
  }

  checkDate(plane: Plane) {
    const planeDate = new Date(plane.date).setHours(0, 0, 0, 0);
    return planeDate >= this.departureStartDate && planeDate < new Date().setHours(0, 0, 0, 0);
  }
}
