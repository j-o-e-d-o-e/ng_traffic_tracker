export interface ForecastDay {
  date: string;
  probability: number;
  hours: ForecastHour[];
}

export interface ForecastHour {
  time: string;
  wind_degree: number;
  probability: number;
}
