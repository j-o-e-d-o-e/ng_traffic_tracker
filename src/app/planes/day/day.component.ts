import {Component, OnInit} from '@angular/core';
import {Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet} from 'ng2-charts';
import {PlaneService} from '../../service/plane.service';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Day} from '../../model/day.model';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css', '../../app.component.css']
})
export class DayComponent implements OnInit {
  chartType: ChartType = 'line';
  chartLabels: Label[] = [];
  chartData: ChartDataSets[];
  chartOptions: ChartOptions = {
    scales: {
      yAxes: [{
        id: 'y-axis-left',
        position: 'left',
        type: 'linear',
        ticks: {
          beginAtZero: true,
        },
        scaleLabel: {
          display: true,
          labelString: 'Planes'
        }
      },
        {
          id: 'y-axis-right',
          position: 'right',
          type: 'linear',
          ticks: {
            beginAtZero: true,
            // max: 400,
          },
          scaleLabel: {
            display: true,
            labelString: 'Wind degrees'
          }
        }]
    }
  };
  pieChartOptions: ChartOptions = {
    responsive: true,
  };
  pieChartLabels: Label[];
  pieChartData: SingleDataSet;
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  day: Day;
  loading: boolean;

  constructor(private service: PlaneService, private route: ActivatedRoute, private router: Router) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.loading = true;
    const date = this.route.snapshot.params.date;
    if (!date) {
      this.service.fetchDay().subscribe(
        (day: Day) => {
          this.setData(day);
          this.router.navigate(['/day', this.day.date]).catch();
          this.loading = false;
        });
    } else {
      this.service.fetch(environment.urlBase + '/day/' + date).subscribe(
        (day: Day) => {
          this.setData(day);
          this.loading = false;
        },
        () => this.router.navigate(['/error']).catch());
    }
    this.chartLabels = [];
    for (let i = 0; i < 24; i++) {
      this.chartLabels.push(i.toString() + ':00');
    }
  }

  setData(day: Day) {
    this.day = day;
    // console.log(this.day);
    this.chartData = [];
    this.chartData.push({data: this.day.hours_plane, label: 'Absolute', yAxisID: 'y-axis-left'});
    this.chartData.push({
      data: this.day.avg_planes,
      label: 'Average (5:45-23:00h)',
      yAxisID: 'y-axis-left',
      fill: false
    });
    this.chartData.push({data: this.day.hours_wind, label: 'Wind direction', yAxisID: 'y-axis-right', fill: false});
    this.pieChartData = [];
    this.pieChartData.push(this.day.departures.continental_abs);
    this.pieChartData.push(this.day.departures.international_abs);
    this.pieChartData.push(this.day.departures.national_abs);
    this.pieChartData.push(this.day.departures.unknown_abs);
    this.pieChartLabels = ['Intercontinental', 'Europe', 'National', 'Unknown'];
    this.pieChartLabels[0] += ' (' + this.day.departures.continental + '%)';
    this.pieChartLabels[1] += ' (' + this.day.departures.international + '%)';
    this.pieChartLabels[2] += ' (' + this.day.departures.national + '%)';
    this.pieChartLabels[3] += ' (' + this.day.departures.unknown + '%)';
  }

  onPrev() {
    this.service.fetch(this.day._links.prev_day.href).subscribe(
      (day: Day) => {
        this.setData(day);
        this.router.navigate(['/day', this.day.date]).catch();
      });
  }

  onRefresh() {
    this.service.fetch(this.day._links.self.href).subscribe(
      (day: Day) => {
        this.setData(day);
      });
  }

  onNext() {
    this.service.fetch(this.day._links.next_day.href).subscribe(
      (day: Day) => {
        this.setData(day);
        this.router.navigate(['/day', this.day.date]).catch();
      });
  }

  onPlanes() {
    this.router.navigate(['/planes', this.day.date]).catch();
  }

  onWeek() {
    this.router.navigate(['/week', this.day.date]).catch();
  }
}
