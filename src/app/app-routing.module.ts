import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { ServicesPageComponent } from './components/services-page/services-page.component';
import { UsComponent } from './components/us/us.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: LandingPageComponent },
  { path: 'services', component: ServicesPageComponent },
  { path: 'us', component: UsComponent },
  { path: 'dashboard/:id' as 'dashboard', component: DashboardComponent},
  { path: 'register', component: RegisterComponent},
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
