import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { FeaturesComponent } from './components/features/features.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoginComponent } from './smartjobs/components/authentication/login/login.component';
import { RegistrationComponent } from './smartjobs/components/authentication/registration/registration.component';
import { PasswordResetComponent } from './smartjobs/components/authentication/password-reset/password-reset.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AboutComponent,
    FeaturesComponent,
    PricingComponent,
    ContactsComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    RegistrationComponent,
    PasswordResetComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
