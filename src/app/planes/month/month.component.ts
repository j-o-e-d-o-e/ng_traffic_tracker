import {Component, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip} from 'ng2-charts';
import {PlaneService} from '../../service/plane.service';
import {Month} from '../../model/month.model';
import {environment} from '../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css', '../../app.component.css']
})
export class MonthComponent implements OnInit {
  chartType: ChartType = 'bar';
  chartLabels: Label[];
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
  month: Month;
  startDateDepartures: Date = new Date(environment.departuresStartDate);
  loading: boolean;

  constructor(private service: PlaneService, private route: ActivatedRoute, private router: Router) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.loading = true;
    const params = this.route.snapshot.params;
    this.service.fetch(environment.urlBase + '/month/' + params.year + '/' + params.month).subscribe(
      (month: Month) => {
        this.setData(month);
        this.loading = false;
      },
      () => this.router.navigate(['/error']).catch());
  }

  private setData(month: Month) {
    this.month = month;
    const monthLength = this.month.days.length;
    this.chartLabels = [];
    const tmp = new Date(month.start_date);
    for (let i = 0; i < monthLength; i++) {
      this.chartLabels.push(tmp.toDateString().slice(0, 3) + tmp.toDateString().slice(7, 10));
      tmp.setDate(tmp.getDate() + 1);
    }
    this.chartData = [];
    this.chartData.push({data: this.month.days, label: 'Absolute'});
    this.chartData.push({data: this.month.avg_planes, label: 'Average', type: 'line', fill: false});
  }

  onPrev() {
    this.service.fetch(this.month._links.prev_month.href).subscribe(
      (month: Month) => {
        this.setData(month);
        this.router.navigate(['/month', this.month.year, this.month.month]).catch();
      });
  }

  onRefresh() {
    this.service.fetch(this.month._links.self.href).subscribe(
      (month: Month) => {
        this.setData(month);
      });
  }

  onNext() {
    this.service.fetch(this.month._links.next_month.href).subscribe(
      (month: Month) => {
        this.setData(month);
        this.router.navigate(['/month', this.month.year, this.month.month]).catch();
      });
  }

  onWeeks() {
    this.router.navigate(['/week', this.month.first_day_of_month]).catch();
  }

  onYear() {
    this.router.navigate(['/year', this.month.year]).catch();
  }

  checkSubHeadline() {
    return new Date(this.month.start_date) <= this.startDateDepartures &&
      this.startDateDepartures <= new Date(this.month.end_date);
  }
}
