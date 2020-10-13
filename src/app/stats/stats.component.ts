import {Component, OnInit} from '@angular/core';
import {PlaneService} from '../service/plane.service';
import {Stats} from '../model/stats.model';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {ChartOptions, ChartType} from 'chart.js';
import {Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet} from 'ng2-charts';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css', '../app.component.css']
})
export class StatsComponent implements OnInit {
  stats: Stats;
  pieChartOptions: ChartOptions = {responsive: true};
  pieChartLabels: Label[];
  pieChartData: SingleDataSet;
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  startDate: Date = new Date(environment.startYear, environment.startMonth - 1, environment.startDay);
  startDateDepartures: Date = new Date(environment.departuresStartDate);
  active: boolean;

  constructor(private service: PlaneService, private router: Router) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.service.fetch(environment.urlBase + '/stats').subscribe((stats: Stats) => {
      this.setData(stats);
      this.active = true;
    });
  }

  private setData(stats: Stats) {
    this.stats = stats;
    // console.log(this.stats);
    this.pieChartData = [];
    this.pieChartData.push(this.stats.departures.continental_abs);
    this.pieChartData.push(this.stats.departures.international_abs);
    this.pieChartData.push(this.stats.departures.national_abs);
    this.pieChartData.push(this.stats.departures.unknown_abs);
    this.pieChartLabels = ['Intercontinental', 'Europe', 'National', 'Unknown'];
    this.pieChartLabels[0] += ' (' + this.stats.departures.continental + '%)';
    this.pieChartLabels[1] += ' (' + this.stats.departures.international + '%)';
    this.pieChartLabels[2] += ' (' + this.stats.departures.national + '%)';
    this.pieChartLabels[3] += ' (' + this.stats.departures.unknown + '%)';
  }

  onDay(date: string) {
    this.router.navigate(['/day', date]).catch();
  }

  onIcao(icao: string) {
    this.router.navigate(['/details', icao]).catch();
  }
}
