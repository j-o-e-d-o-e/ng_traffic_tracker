import {Component, Input, OnInit} from '@angular/core';
import {ChartOptions, ChartType} from 'chart.js';
import {monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip} from 'ng2-charts';
import {KeyValue} from '../model/key-value.model';
import {Departures} from '../model/departures.model';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-airports',
  templateUrl: './airports.component.html',
  styleUrls: ['./airports.component.css', '../app.component.css']
})
export class AirportsComponent implements OnInit {
  @Input()
  departures: Departures;
  @Input()
  airports: KeyValue[];
  @Input()
  subHeadline: boolean;
  startDateDepartures: Date = new Date(environment.departuresStartDate);
  pieChartOptions: ChartOptions = {
    responsive: true,
  };
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
  }

  setData() {
    return [
      this.departures.continental_abs,
      this.departures.international_abs,
      this.departures.national_abs,
      this.departures.unknown_abs
    ];
  }

  setLabels() {
    return [
      'Intercontinental (' + this.departures.continental_abs + '/' + this.departures.continental + '%)',
      'Europe (' + this.departures.international_abs + '/' + this.departures.international + '%)',
      'National (' + this.departures.national_abs + '/' + this.departures.national + '%)',
      'Unknown (' + this.departures.unknown_abs + '/' + this.departures.unknown + '%)'
    ];
  }
}
