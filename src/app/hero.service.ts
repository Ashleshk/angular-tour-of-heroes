import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
//You used RxJS of() to return an observable of mock heroes
// (Observable<Hero[]>).
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
//
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';  // URL to web api
  //The component's ngOnInit lifecycle hook calls the HeroService method, not the constructor. 
  constructor( private http: HttpClient,
    private messageService: MessageService) {
    //This is a typical "service-in-service" scenario: you inject 
    // the MessageService into the HeroService which is injected into 
    // the HeroesComponent.
   }


  // getHeroes(): Hero[] {  //OLD
  //   return HEROES;
  // }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
  this.messageService.add(`HeroService: ${message}`);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
}


// A provider is something that can create or deliver a service; 
//in this case, it instantiates the HeroService class to provide 
//the service.
//
//By default, the Angular CLI command ng generate service registers 
// a provider with the root injector for your service by including 
// provider metadata, that is providedIn: 'root' in the @Injectable()
//  decorator.