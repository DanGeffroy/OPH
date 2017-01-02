export class Hero {
  id: number;
  name: string;
  type : String; //possible value dps heal tank
  metaValue : number; //0 to 1, closer to one better in the current meta the hero is
  isCounterBy: [Hero]; //
  counter:[Hero];
  img : String; // path to img
}
