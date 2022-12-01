import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { ServicesComponent } from './components/services/services.component';
import { UsComponent } from './components/us/us.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: LandingPageComponent },
  { path: 'reservations', component: ReservationComponent },
  { path: 'us', component: UsComponent },
  { path: 'services', component: ServicesComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
