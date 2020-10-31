import {Component, OnInit} from '@angular/core';
import {PlaneService} from '../service/plane.service';
import {environment} from '../../environments/environment';
import {ForecastDay} from '../model/forecast.model';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecasts.component.html',
  styleUrls: ['./forecasts.component.css', '../app.component.css']
})
export class ForecastsComponent implements OnInit {
  url: string = environment.urlBase + '/forecasts';
  forecasts: ForecastDay[];
  active: boolean;

  constructor(private service: PlaneService) {
  }

  ngOnInit() {
    this.service.fetch(this.url).subscribe((forecasts: ForecastDay[]) => {
      this.setData(forecasts);
      this.active = true;
    });
  }

  setData(forecasts: ForecastDay[]) {
    this.forecasts = forecasts;
    // console.log(this.forecasts);
  }
}
