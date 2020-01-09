import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './smartjobs/components/authentication/login/login.component';
import { RegistrationComponent } from './smartjobs/components/authentication/registration/registration.component';
import { PasswordResetComponent } from './smartjobs/components/authentication/password-reset/password-reset.component';

import { DashboardComponent } from './smartjobs/components/dashboard/dashboard.component';
import { HomepageComponent } from './smartjobs/components/homepage/homepage.component';
import { HrdashboardComponent } from './smartjobs/components/hrdashboard/hrdashboard.component';
import { AddJobComponent } from './smartjobs/components/jobs/add-job/add-job.component';
import { EditJobComponent } from './smartjobs/components/jobs/edit-job/edit-job.component';
import { ViewAllJobsComponent } from './smartjobs/components/jobs/view-all-jobs/view-all-jobs.component';
import { ViewJobComponent } from './smartjobs/components/jobs/view-job/view-job.component';
import { ViewJobsByuserComponent } from './smartjobs/components/jobs/view-jobs-byuser/view-jobs-byuser.component';
import {  ViewApplicationsComponent } from './smartjobs/components/jobs/view-applications/view-applications.component';
import { ViewShortlistComponent } from './smartjobs/components/jobs/view-shortlist/view-shortlist.component';
import { ViewInterviewedComponent } from './smartjobs/components/jobs/view-interviewed/view-interviewed.component';
import { AddContractComponent } from './smartjobs/components/employees/add-contract/add-contract.component';
import { EditContractComponent } from './smartjobs/components/employees/edit-contract/edit-contract.component';
import { ViewContractComponent } from './smartjobs/components/employees/view-contract/view-contract.component';



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
{ path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
{ path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard]},
{ path: 'create-profile', component: CreateProfileComponent, canActivate: [AuthGuard] },
{ path: 'company-profile', component: CompanyProfileComponent, canActivate: [AuthGuard] },
{ path: 'create-companyprofile', component: CreateCompanyProfileComponent },
{ path: 'edit-companyprofile', component: EditCompanyProfileComponent, canActivate: [AuthGuard] },
{ path: 'userdashboard', component: DashboardComponent, canActivate: [AuthGuard] },
{ path: 'dashboard', component: HrdashboardComponent, canActivate: [AuthGuard] },
{ path: 'add-job', component: AddJobComponent },
{ path: 'edit-job/:id', component: EditJobComponent },
{ path: 'agency-jobs', component: ViewAllJobsComponent },
{path: 'view-job/:id', component: ViewJobComponent },
{path: 'view-jobs', component: ViewJobsByuserComponent },
{path: 'view-applications/:id', component: ViewApplicationsComponent },
{path: 'view-shortlist/:id', component: ViewShortlistComponent},
{path: 'view-interviewed/:id', component: ViewInterviewedComponent},
{path: 'add-contract/:id', component: AddContractComponent},
{path: 'edit-contract/:id', component: EditContractComponent},
{path: 'view-contract', component: ViewContractComponent}
];


@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
