import {Day} from './day.model';
import {Plane} from './planes-list.model';
import {Departures} from './departures.model';
import {KeyValue} from './key-value.model';

export interface Stats {
  total: number;
  day_with_most_flights: {'day': Day, stats: number};
  day_with_most_flights_within_one_hour: {'day': Day, stats: number};
  days_with_less_than_thirty_flights: number;
  hours_with_no_flights: number;
  departures: Departures;
  airports: KeyValue[];
  plane_with_most_flights: {'icao': string, 'stats': number};
  plane_with_most_flights_within_one_day: {'day': Day, 'stats': number, 'icao': string};
  max_altitude: Plane;
  min_altitude: Plane;
  max_speed: Plane;
  min_speed: Plane;
  airlines: KeyValue[];
  score: Score;
}

export interface Score {
  precision: number;
  mean_abs_error: number;
  confusion_matrix: any;
  recall: number;
}
