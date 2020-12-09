import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }
  getHeroes(): Hero[] {
    return HEROES;
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