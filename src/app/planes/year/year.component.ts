import {Component, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet} from 'ng2-charts';
import {PlaneService} from '../../service/plane.service';
import {Year} from '../../model/year.model';
import {environment} from '../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.css', '../../app.component.css']
})
export class YearComponent implements OnInit {
  chartType: ChartType = 'bar';
  chartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  chartData: ChartDataSets[];
  chartOptions: ChartOptions = {
    scales: {
      yAxes: [{
        position: 'left',
        ticks: {
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          labelString: 'Planes'
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
  year: Year;
  startDateDepartures: Date = new Date(environment.departuresStartDate);
  loading: boolean;

  constructor(private service: PlaneService, private route: ActivatedRoute, private router: Router) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.loading = true;
    this.service.fetch(environment.urlBase + '/year/' + this.route.snapshot.params.year).subscribe(
      (year: Year) => {
        this.setData(year);
        this.loading = false;
      },
      () => this.router.navigate(['/error']).catch());
  }

  private setData(year: Year) {
    this.year = year;
    this.chartData = [];
    this.chartData.push({data: this.year.months, label: 'Absolute'});
    this.chartData.push({data: this.year.avg_planes, label: 'Average', type: 'line', fill: false});
    this.pieChartData = [];
    this.pieChartData.push(this.year.departures.continental_abs);
    this.pieChartData.push(this.year.departures.international_abs);
    this.pieChartData.push(this.year.departures.national_abs);
    this.pieChartData.push(this.year.departures.unknown_abs);
    this.pieChartLabels = ['Intercontinental', 'Europe', 'National', 'Unknown'];
    this.pieChartLabels[0] += ' (' + this.year.departures.continental + '%)';
    this.pieChartLabels[1] += ' (' + this.year.departures.international + '%)';
    this.pieChartLabels[2] += ' (' + this.year.departures.national + '%)';
    this.pieChartLabels[3] += ' (' + this.year.departures.unknown + '%)';
  }

  onPrev() {
    this.service.fetch(this.year._links.prev_year.href).subscribe(
      (year: Year) => {
        this.setData(year);
        this.router.navigate(['/year', this.year.year]).catch();
      });
  }

  onRefresh() {
    this.service.fetch(this.year._links.self.href).subscribe(
      (year: Year) => {
        this.setData(year);
      });
  }

  onNext() {
    this.service.fetch(this.year._links.next_year.href).subscribe(
      (year: Year) => {
        this.setData(year);
        this.router.navigate(['/year', this.year.year]).catch();
      });
  }

  onMonths() {
    this.router.navigate(['/month', this.year.year, this.year.first_month]).catch();
  }

  checkSubHeadline() {
    return new Date(this.year.start_date) <= this.startDateDepartures &&
      this.startDateDepartures <= new Date(this.year.end_date);
  }
}
