import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoginComponent } from './smartjobs/components/authentication/login/login.component';
import { RegistrationComponent } from './smartjobs/components/authentication/registration/registration.component';
import { PasswordResetComponent } from './smartjobs/components/authentication/password-reset/password-reset.component';
import { DashboardComponent } from './smartjobs/components/dashboard/dashboard.component';
import { HrdashboardComponent } from './smartjobs/components/hrdashboard/hrdashboard.component';
import { ProfileComponent } from './smartjobs/components/user/profile/profile.component';
import { CompanyProfileComponent } from './smartjobs/components/agency/company-profile/company-profile.component';
import { EditCompanyProfileComponent } from './smartjobs/components/agency/edit-company-profile/edit-company-profile.component';
import { EditProfileComponent } from './smartjobs/components/user/edit-profile/edit-profile.component';
import { CreateProfileComponent } from './smartjobs/components/user/create-profile/create-profile.component';
import { CreateCompanyProfileComponent } from './smartjobs/components/agency/create-company-profile/create-company-profile.component';


@NgModule({
  declarations: [
    AppComponent,

    FooterComponent,
    HeaderComponent,
    LoginComponent,
    RegistrationComponent,
    PasswordResetComponent,
    DashboardComponent,
    HrdashboardComponent,
    ProfileComponent,
    CompanyProfileComponent,
    EditCompanyProfileComponent,
    EditProfileComponent,
    CreateProfileComponent,
    CreateCompanyProfileComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
