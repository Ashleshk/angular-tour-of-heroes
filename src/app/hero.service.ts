import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
//You used RxJS of() to return an observable of mock heroes
// (Observable<Hero[]>).
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


// @Injectable() decorator.  marks the class as one that 
// participates in the dependency injection system. The HeroService 
// class is going to provide an injectable service, and it can 
// also have its own injected dependencies.
@Injectable({
  providedIn: 'root'
  // A provider is something that can create or deliver a service; 
  //in this case, it instantiates the HeroService class to provide 
  //the service.
  //
  //By default, the Angular CLI command ng generate service registers 
  // a provider with the root injector for your service by including 
  // provider metadata, that is providedIn: 'root' in the @Injectable()
  //  decorator
})
export class HeroService {
  private heroesUrl = 'api/heroes';  // URL to web api
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  
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

  // getHeroes(): Observable<Hero[]> {
     // TODO: send the message _after_ fetching the heroes
    // this.messageService.add('HeroService: fetched heroes');
  //   return of(HEROES);   //of(HEROES) returns an Observable<Hero[]> that emits 
                            //a single value, the array of mock heroes.
  // }

  // call HttpClient.get<Hero[]>() which also returns an 
  // Observable<Hero[]> that emits a single value, an array of heroes
  //  from the body of the HTTP response.
  getHeroes(): Observable<Hero[]> {

    

    // HttpClient.get() returns the body of the response as an 
    // untyped JSON object by default. Applying the optional type 
    // specifier, <Hero[]> , adds TypeScript capabilities, which 
    // reduce errors during compile time.

    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
      // The catchError() operator intercepts an Observable that 
      // failed. The operator then passes the error to the error 
      // handling function.

     //The following handleError() method reports the error and 
     //then returns an innocuous result so that the application keeps working.
    );
    //tap into the flow of observable values and send a message,
    // via the log() method, to the message area at the bottom of
    // the page.

    //The tap() call back doesn't touch the values themselves.

  }

  // getHero(id: number): Observable<Hero> {
  //   // TODO: send the message _after_ fetching the hero
  //   this.messageService.add(`HeroService: fetched hero id=${id}`);
  //   return of(HEROES.find(hero => hero.id === id));
  // }
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }
  
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
  this.messageService.add(`HeroService: ${message}`);
  }


  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
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
}


// HttpClient methods return one value
// All HttpClient methods return an RxJS Observable of something.

// HTTP is a request/response protocol. You make a request, it 
// returns a single response.

// In general, an observable can return multiple values over time.
//  An observable from HttpClient always emits a single value and 
//  then completes, never to emit again.

// This particular HttpClient.get() call returns an 
// Observable<Hero[]>; that is, "an observable of hero arrays". 
// In practice, it will only return a single hero array.