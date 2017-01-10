import { Component} from '@angular/core';
import { HttpModule } from '@angular/http';
import { Hero } from './hero';
import { HeroDataService} from './hero-data.service';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';

import { Meta } from './meta';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HeroDataService],
})
export class AppComponent {
  isDarkTheme: boolean = false;
  title = 'OW pick';
  heroes : Hero[];
  errorMessage: string;
  selectedHero: Hero;
  meta : Meta;
  neededType :String;

  teamHeroes : Hero[];
  teamMeta : Meta;
  constructor(private heroDataService: HeroDataService, private _dialog: MdDialog) {
    this.getMeta();
    this.getHeroes();

    var heroNull = {
      "id": 0,
      "name": "",
      "type" : "", //possible value dps heal tank
      "text":"",
      "metaValue" : 0, //0 to 1, closer to one better in the current meta the hero is
      "isCounterBy":null, //
      "counter": null,
      "img" : "assets/img/pick.png" // path to img
    };
    this.selectedHero = heroNull;
    this.teamHeroes = [];
    for (let i = 0; i < 5; i++) {
      this.teamHeroes[i] = heroNull;
    }

  }
  getMeta(){
      this.heroDataService.getMeta()
                          .then(
                            meta => this.meta = meta,
                            error =>  this.errorMessage = <any>error);
  }
  getHeroes() {
    this.heroDataService.getHeroes()
                        .then(
                          heroes => this.heroes = heroes,
                          error =>  this.errorMessage = <any>error);
    }
    selectHeroToCounter(){
      let dialogRef = this._dialog.open(DialogContent,{disableClose:true});

      dialogRef.afterClosed().subscribe(result => {
        this.selectedHero = result;
      })
    }

    selectTeamHero(i){
      let dialogRef = this._dialog.open(DialogContent,{disableClose:true});

      dialogRef.afterClosed().subscribe(result => {
        this.teamHeroes[i] = result;
        this.getTeamMeta();
        this.getNeededType();

      })
    }
    getTeamMeta(){
      this.teamMeta = JSON.parse(JSON.stringify(this.meta)); //avoid reference
      this.teamHeroes.forEach((hero) => {
        if(hero.type === "DPS"){
          this.teamMeta.DPS--;
        }
        if(hero.type === "DEFF"){
          this.teamMeta.DEFF--;
        }
        if(hero.type === "TANK"){
          this.teamMeta.TANK--;
        }
        if(hero.type === "HEAL"){
          this.teamMeta.HEAL--;
        }
      });
    }
    getNeededType(){

      var keys = Object.keys(this.teamMeta);
      var largest = Math.max.apply(null, keys.map(x => this.teamMeta[x]));
      keys.reduce(
        (result, key) => {
          if (this.teamMeta[key] === largest){
            this.neededType = key;
            result.push(key);
          }
          return result;
        }, []);
    }
}
@Component({
  template: `
    <div class="row" [class.m2app-dark]="isDarkTheme">
      <div class="col-xs-4 col-md-2" *ngFor="let hero of heroes">
        <div class="card" (click)="dialogRef.close(hero)">
          <img class="card-img-top img-fluid" attr.src="{{hero.img}}" alt="Card image cap">
        </div>
      </div>
    </div>
  `,
  styles:[`
    .card:hover{
      cursor:pointer;
    }
    .card{
      background-color: #CDDC39;
    }


    `],
  selector: 'modal',
  providers: [HeroDataService]

})
export class DialogContent {
  isDarkTheme: boolean = true;
  heroes : Hero[];
  errorMessage: string;
  constructor(public dialogRef: MdDialogRef<DialogContent>,private heroDataService: HeroDataService) {
    this.getHeroes();
  }

  getHeroes() {
    this.heroDataService.getHeroes()
                        .then(
                          heroes => this.heroes = heroes,
                          error =>  this.errorMessage = <any>error);
    }
}
