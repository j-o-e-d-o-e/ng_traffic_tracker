import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {FormsModule} from '@angular/forms';
import {TooltipModule} from 'ng2-tooltip-directive';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ChartsModule} from 'ng2-charts';
import {PlaneService} from './service/plane.service';
import {DayComponent} from './planes/day/day.component';
import {WeekComponent} from './planes/week/week.component';
import {MonthComponent} from './planes/month/month.component';
import {YearComponent} from './planes/year/year.component';
import {PlanesListComponent} from './planes/planes-list/planes-list.component';
import {HomeComponent} from './home/home.component';
import {PlanesDetailComponent} from './planes/planes-detail/planes-detail.component';
import {ForecastsComponent} from './forecasts/forecasts.component';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import {environment} from '../environments/environment';
import { ErrorComponent } from './error/error.component';
import { StatsComponent } from './stats/stats.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    DayComponent,
    WeekComponent,
    MonthComponent,
    YearComponent,
    PlanesListComponent,
    HomeComponent,
    PlanesDetailComponent,
    ForecastsComponent,
    MapComponent,
    ErrorComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    NgbModule,
    TooltipModule,
    ChartsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapApiKey
    }),
    AppRoutingModule
  ],
  providers: [PlaneService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
