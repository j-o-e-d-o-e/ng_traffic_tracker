import {KeyValue} from './key-value.model';
import {Departures} from './departures.model';

export interface Week {
  avg_altitude: number;
  avg_planes: number[];
  avg_speed: number;
  end_date: string;
  month: number;
  next: boolean;
  now: string;
  planes_0: number;
  planes_23: number;
  prev: boolean;
  start_date: string;
  total: number;
  weekdays: number[];
  year: number;
  departures: Departures;
  airports: KeyValue[];
  _links: {
    days: { href: string }
    month: { href: string }
    next_week: { href: string }
    prev_week: { href: string }
    self: { href: string }
  };
}
