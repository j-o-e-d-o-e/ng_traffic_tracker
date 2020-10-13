import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlaneService} from '../service/plane.service';
import {interval, Subscription} from 'rxjs';
import {environment} from '../../environments/environment';
import {CurrentPlane, MapResponse} from './current-plane.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css', '../app.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  fetchRate = 20000;
  moveRate = 2000;
  stepLongitude = 0.001;
  stepLatitude = 0.0006;
  outLongitude = 6.7735;
  outLatitude = 51.2919;
  zoom = 11;
  longitude = (this.outLongitude + 7.0014) / 2.0;
  latitude = (this.outLatitude + 51.3859) / 2.0;
  currentPlanes: CurrentPlane[] = [];
  subscription: Subscription;
  moving: Subscription;

  constructor(private service: PlaneService) {
  }

  ngOnInit() {
    this.subscription = interval(this.fetchRate).subscribe(() => this.fetchData());
    this.fetchData();
    this.moving = interval(this.moveRate).subscribe(() => {
      if (this.currentPlanes.length > 0) {
        this.movePlanes();
      }
    });
  }

  fetchData() {
    this.service.fetch(environment.urlBase + '/current').subscribe((response: MapResponse) => {
      if (response.updated && response.planes.length !== 0) {
        this.setData(response.planes);
      }
    });
  }

  setData(planes: CurrentPlane[]) {
    this.currentPlanes = planes;
    console.log('Current planes:', this.currentPlanes);
  }

  private movePlanes() {
    for (const plane of this.currentPlanes) {
      plane.longitude -= this.stepLongitude;
      plane.latitude -= this.stepLatitude;
      if (plane.longitude <= this.outLongitude || plane.latitude <= this.outLatitude) {
        const index = this.currentPlanes.indexOf(plane);
        this.currentPlanes.splice(index, 1);
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.moving.unsubscribe();
  }
}
