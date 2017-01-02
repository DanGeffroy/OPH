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
