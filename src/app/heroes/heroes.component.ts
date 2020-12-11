import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
// import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  // hero: Hero = {
  //   id: 1,
  //   name: 'Windstorm'
  // };
  heroes: Hero[];
  //selectedHero: Hero;

  
  constructor(private heroService: HeroService ) { 
    // The parameter simultaneously defines a private heroService 
    // property and identifies it as a HeroService injection site.

    // When Angular creates a HeroesComponent, the Dependency Injection
    //  system sets the heroService parameter to the singleton instance 
    //  of HeroService.
  }

  // onSelect(hero: Hero): void {
  //   //this.selectedHero = hero;
  //   //after message service is injected
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  // }

  ngOnInit(){
    this.getHeroes();
  }
  getHeroes(): void {
   //* this.heroes = this.heroService.getHeroes();  //OLD

    // The HeroService.getHeroes() method has a synchronous signature,
    //  which implies that the HeroService can fetch heroes synchronously.
    //   The HeroesComponent consumes the getHeroes() result as if heroes 
    //   could be fetched synchronously.

    // This will not work in a real app. You're getting away with it now
    //  because the service currently returns mock heroes. But soon the 
    //  app will fetch heroes from a remote server, which is an 
    //  inherently asynchronous operation.

  //   The HeroService must wait for the server to respond, getHeroes() 
  //   cannot return immediately with hero data, and the browser will
  //    not block while the service waits.
  // HeroService.getHeroes() must have an asynchronous signature of 
  // some kind.

  // In this tutorial, HeroService.getHeroes() will return an Observable
  //  because it will eventually use the Angular HttpClient.get
  //   method to fetch the heroes and HttpClient.get() returns an 
  //   Observable.


  //Applyting ABOVE  --just to accept observable<Hero[]> realtime serverlike scenerio
  this.heroService.getHeroes()
        .subscribe(heroes =>this.heroes =heroes);
  
  // This version waits for the Observable to emit the array of 
  // heroes—which could happen now or several minutes from now. The 
  // subscribe() method passes the emitted array to the callback, which
  //  sets the component's heroes property.

  //This asynchronous approach will work when the HeroService
  // requests heroes from the server.
}

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
 
}
