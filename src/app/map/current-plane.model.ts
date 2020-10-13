export interface MapResponse {
  updated: boolean;
  planes: CurrentPlane[];
}

export interface CurrentPlane {
  icao: string;
  date: string;
  altitude: number;
  speed: number;
  longitude: number;
  latitude: number;
  updated: boolean;
}
