import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ForecastsComponent} from './forecasts/forecasts.component';
import {MapComponent} from './map/map.component';
import {WeekComponent} from './planes/week/week.component';
import {DayComponent} from './planes/day/day.component';
import {MonthComponent} from './planes/month/month.component';
import {YearComponent} from './planes/year/year.component';
import {PlanesListComponent} from './planes/planes-list/planes-list.component';
import {PlanesDetailComponent} from './planes/planes-detail/planes-detail.component';
import {ErrorComponent} from './error/error.component';
import {StatsComponent} from './stats/stats.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'details/:icao', component: PlanesDetailComponent},
  {path: 'planes/:date', component: PlanesListComponent},
  {path: 'day', component: DayComponent},
  {path: 'day/:date', component: DayComponent},
  {path: 'week/:date', component: WeekComponent},
  {path: 'month/:year/:month', component: MonthComponent},
  {path: 'year/:year', component: YearComponent},
  {path: 'map', component: MapComponent},
  {path: 'forecasts', component: ForecastsComponent},
  {path: 'stats', component: StatsComponent},
  {path: 'error', component: ErrorComponent},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
