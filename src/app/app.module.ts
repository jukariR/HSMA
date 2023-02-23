import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Modules
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//Components
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './reusable-component/navbar/navbar.component';
import { FooterComponent } from './reusable-component/footer/footer.component';
import { ServicesComponent } from './components/services/services.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { UsComponent } from './components/us/us.component';

@NgModule({
  declarations: [
    NavbarComponent,
    AppComponent,
    LoginComponent,
    LandingPageComponent,
    FooterComponent,
    ServicesComponent,
    ReservationComponent,
    UsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
