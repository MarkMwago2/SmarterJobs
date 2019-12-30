import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { CloudinaryModule } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';

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
import { HomepageComponent } from './smartjobs/components/homepage/homepage.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService, AuthInterceptor, AuthGuard } from './smartjobs/services/auth.service';
import { LoaderComponent } from './shared/components/loader/loader.component';

import { LoaderService } from './smartjobs/services/loader.service';
import { ProfileService } from './smartjobs/services/profile.service';
import { IndustryService } from './smartjobs/services/industry.service';
import { LoaderInterceptor } from './smartjobs/interceptors/loader.interceptor';
import { MergePipe } from './shared/pipes/merge.pipe';
import { NotifierModule } from 'angular-notifier';

import { MatButtonModule, MatCardModule, MatSnackBarModule, MatCheckboxModule, MatInputModule, MatSelectModule, } from '@angular/material';
const MatModules = [
  MatButtonModule,
  MatCardModule,
  MatSnackBarModule,
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatSelectModule,
];



export const cloudinaryLib = {
  Cloudinary
};

import { IntropageComponent } from './smartjobs/components/intropage/intropage.component';

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
    HomepageComponent,
    ProfileComponent,
    CompanyProfileComponent,
    EditCompanyProfileComponent,
    EditProfileComponent,
    CreateProfileComponent,
    CreateCompanyProfileComponent,
    LoaderComponent,
    HomepageComponent,
    IntropageComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    FormsModule,
    CloudinaryModule.forRoot(cloudinaryLib, { cloud_name: environment.cloudName, secure: true }),
    ...MatModules,
    ReactiveFormsModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right'
        }
      }
    }),
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    IndustryService,
    LoaderService,
    ProfileService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
