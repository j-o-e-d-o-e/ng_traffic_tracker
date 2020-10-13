import {KeyValue} from './key-value.model';
import {Departures} from './departures.model';

export interface Year {
  avg_altitude: number;
  avg_planes: number[];
  avg_speed: number;
  days_with_less_than_thirty_planes: number;
  end_date: string;
  first_month: number;
  next: boolean;
  now: string;
  planes_0: number;
  planes_23: number;
  prev: boolean;
  start_date: string;
  total: number;
  months: number[];
  year: number;
  departures: Departures;
  airports: KeyValue[];
  _links: {
    months: { href: string }
    next_year: { href: string }
    prev_year: { href: string }
    self: { href: string }
  };
}
