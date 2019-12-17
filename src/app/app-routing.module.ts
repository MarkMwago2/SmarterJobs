import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './smartjobs/components/authentication/login/login.component';
import { RegistrationComponent } from './smartjobs/components/authentication/registration/registration.component';
import { PasswordResetComponent } from './smartjobs/components/authentication/password-reset/password-reset.component';

import { DashboardComponent } from './smartjobs/components/dashboard/dashboard.component';
import { HrdashboardComponent } from './smartjobs/components/hrdashboard/hrdashboard.component';

import { ProfileComponent } from './smartjobs/components/user/profile/profile.component';
import { CreateProfileComponent } from './smartjobs/components/user/create-profile/create-profile.component';
import { EditProfileComponent } from './smartjobs/components/user/edit-profile/edit-profile.component';
import { CompanyProfileComponent } from './smartjobs/components/agency/company-profile/company-profile.component';
import { CreateCompanyProfileComponent } from './smartjobs/components/agency/create-company-profile/create-company-profile.component';

import { EditCompanyProfileComponent } from './smartjobs/components/agency/edit-company-profile/edit-company-profile.component';
import { IntropageComponent } from './smartjobs/components/intropage/intropage.component';

import { AuthGuard } from './smartjobs/services/auth.service';

const routes: Routes = [

  { path: 'home', component: IntropageComponent },
  { path: 'sign-in', component: LoginComponent },
  { path: 'sign-up', component: RegistrationComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]  },
  { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard]  },
  { path: 'create-profile', component: CreateProfileComponent, canActivate: [AuthGuard]  },
  { path: 'company-profile', component: CompanyProfileComponent, canActivate: [AuthGuard]  },
  { path: 'create-companyprofile', component: CreateCompanyProfileComponent, canActivate: [AuthGuard]  },
  { path: 'edit-companyprofile', component: EditCompanyProfileComponent, canActivate: [AuthGuard]  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
