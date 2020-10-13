import {KeyValue} from './key-value.model';
import {Departures} from './departures.model';

export interface Day {
  avg_altitude: number;
  avg_planes: number[];
  avg_speed: number;
  date: string;
  hours_plane: number[];
  hours_wind: number[];
  next: boolean;
  now: string;
  prev: boolean;
  total: number;
  weekday: string;
  wind_speed: number;
  departures: Departures;
  airports: KeyValue[];
  _links: {
    next_day: { href: string }
    planes: { href: string }
    prev_day: { href: string }
    self: { href: string }
    week: { href: string }
  };
}
