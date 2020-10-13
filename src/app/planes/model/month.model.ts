export interface Month {
  avg_altitude: number;
  avg_planes: number[];
  avg_speed: number;
  days: number[];
  days_with_less_than_thirty_planes: number;
  end_date: string;
  first_day_of_month: number;
  month: number;
  next: boolean;
  now: string;
  planes_0: number;
  planes_23: number;
  prev: boolean;
  start_date: string;
  total: number;
  year: number;
  _links: {
    next_month: { href: string }
    prev_month: { href: string }
    self: { href: string }
    weeks: { href: string }
    year: { href: string }
  };
}
