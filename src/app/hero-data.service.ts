import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';
import { Meta } from './meta';

@Injectable()
export class HeroDataService {
  heroesUrl = "assets/data/heroes.json"
  metaUrl = "assets/data/meta.json"
  constructor(private http: Http) { }

  getHeroes(): Promise<Hero[]>{
    return this.http.get(this.heroesUrl)
              .toPromise()
              .then(response => response.json().data as Hero[])
              .catch(this.handleError);
  }
  getMeta(): Promise<Meta>{
    return this.http.get(this.metaUrl)
              .toPromise()
              .then(response => response.json() as Meta)
              .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
