import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'heroes', component: HeroesComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// The @NgModule metadata initializes the router and starts it listening
//  for browser location changes.

// The following line adds the RouterModule to the AppRoutingModule 
// imports array and configures it with the routes in one step by
//  calling RouterModule.forRoot():

// The method is called forRoot() because you configure the router at
//  the application's root level. The forRoot() method supplies the 
//  service providers and directives needed for routing, and performs
//   the initial navigation based on the current browser URL.