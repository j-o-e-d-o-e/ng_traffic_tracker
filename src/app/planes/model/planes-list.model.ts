export interface PlanesList {
  _embedded: {
    planeDtoes: Plane[]
  };
  _links: {
    next: { href: string }
    prev: { href: string }
    self: { href: string }
    last: { href: string }
  };
  page: {
    number: number;
    totalPages: number;
  };
}

export interface Plane {
  altitude: number;
  date_time: string;
  date: string;
  icao_24: string;
  speed: number;
  _links: {
    day: { href: string }
    icao_24: { href: string }
    self: { href: string }
  };
}
