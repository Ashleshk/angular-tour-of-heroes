import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
//You used RxJS of() to return an observable of mock heroes
// (Observable<Hero[]>).
import { MessageService } from './message.service';
//The HeroService injected into a component is created with another injected service, MessageService.
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  //The component's ngOnInit lifecycle hook calls the HeroService method, not the constructor. 
  constructor(private messageService:MessageService) {
    //This is a typical "service-in-service" scenario: you inject 
    // the MessageService into the HeroService which is injected into 
    // the HeroesComponent.
   }


  // getHeroes(): Hero[] {  //OLD
  //   return HEROES;
  // }

  getHeroes(): Observable<Hero[]> {  //NEW
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }
}


// A provider is something that can create or deliver a service; 
//in this case, it instantiates the HeroService class to provide 
//the service.
//
//By default, the Angular CLI command ng generate service registers 
// a provider with the root injector for your service by including 
// provider metadata, that is providedIn: 'root' in the @Injectable()
//  decorator.