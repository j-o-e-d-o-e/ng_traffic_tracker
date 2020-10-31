import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PlaneService {
  url = environment.urlBase;

  constructor(private http: HttpClient) {
  }

  fetch(url: string) {
    return this.http.get(url);
  }

  fetchCurrentDay() {
    return this.http.get(this.url + '/day');
  }
}
