import { Component } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Hero } from './hero';
import { HeroDataService} from './hero-data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HeroDataService ]
})
export class AppComponent {
  title = 'app works!';
  heroes : Hero[];
  errorMessage: string;
  selectedHero: Hero =  {
    "id": 0,
    "name": "",
    "type" : "", //possible value dps heal tank
    "text":"",
    "metaValue" : 0, //0 to 1, closer to one better in the current meta the hero is
    "isCounterBy":null, //
    "counter": null,
    "img" : "" // path to img
  };
;
  constructor(private heroDataService: HeroDataService) {
    this.getHeroes();
  }
  getHeroes() {
    this.heroDataService.getHeroes()
                        .then(
                          heroes => this.heroes = heroes,
                          error =>  this.errorMessage = <any>error);
    }
}
