import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {CdkDetailRowDirective} from './cdk-detail-row.directive';

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
import { JobsService } from './smartjobs/services/jobs.service';
import { IndustryService } from './smartjobs/services/industry.service';
import { LoaderInterceptor } from './smartjobs/interceptors/loader.interceptor';
import { MergePipe } from './shared/pipes/merge.pipe';
import { NotifierModule } from 'angular-notifier';

import { ToastrModule } from 'ngx-toastr';
import {NgxLoaderIndicatorModule} from 'ngx-loader-indicator';


import { MatButtonModule, MatCardModule, MatDatepickerModule, MatSnackBarModule, MatCheckboxModule, MatInputModule, MatSelectModule, MatToolbarModule, MatSidenavModule, MatChipsModule, MatRadioModule,MatBadgeModule,MatListModule,
MatGridListModule, MatFormFieldModule, MatSortModule, MatStepperModule, MatTableModule, } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatNativeDateModule, MatIconModule} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import {  MAT_DATE_LOCALE, SatDatepickerModule } from 'saturn-datepicker';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import {MatTooltipModule, MatTooltip} from '@angular/material/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/helpers/format-datepicker';




const MatModules = [
  MatButtonModule,
  MatCardModule,
  MatSnackBarModule,
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatSelectModule,
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatMomentDateModule,
  MatTooltipModule,
  MatToolbarModule,
  FlexLayoutModule,
  MatSidenavModule,
  MatChipsModule, MatRadioModule, MatBadgeModule, MatListModule,
  MatGridListModule, MatFormFieldModule, MatSortModule,
  MatStepperModule,
  MatTableModule,
];



export const cloudinaryLib = {
  Cloudinary
};

import { IntropageComponent } from './smartjobs/components/intropage/intropage.component';
import { AddJobComponent } from './smartjobs/components/jobs/add-job/add-job.component';
import { ViewJobComponent } from './smartjobs/components/jobs/view-job/view-job.component';
import { EditJobComponent } from './smartjobs/components/jobs/edit-job/edit-job.component';
import { ViewAllJobsComponent } from './smartjobs/components/jobs/view-all-jobs/view-all-jobs.component';
import { ViewJobsByuserComponent } from './smartjobs/components/jobs/view-jobs-byuser/view-jobs-byuser.component';

@NgModule({
  declarations: [
    AppComponent,
    CdkDetailRowDirective,
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
    IntropageComponent,
    AddJobComponent,
    ViewJobComponent,
    EditJobComponent,
    ViewAllJobsComponent,
    ViewJobsByuserComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    FormsModule,
    MatPaginatorModule,
    MatSelectCountryModule,
    SatDatepickerModule,
    CloudinaryModule.forRoot(cloudinaryLib, { cloud_name: environment.cloudName, secure: true }),
    ...MatModules,
    ReactiveFormsModule,
    ToastrModule.forRoot(), // ToastrModule added
    NgxLoaderIndicatorModule.forRoot({
      imgStyles: {
        width: '30px', // '30px'
        color: 'rgb(25.5, 34.9, 71)', // 'yellow' or rgb(255, 255, 0)
      },
    }),
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
    JobsService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ],
  bootstrap: [AppComponent],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
