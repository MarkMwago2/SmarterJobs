import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
<<<<<<< HEAD

import { LoginComponent } from './smartjobs/components/authentication/login/login.component';
import { RegistrationComponent } from './smartjobs/components/authentication/registration/registration.component';
import { PasswordResetComponent } from './smartjobs/components/authentication/password-reset/password-reset.component';

import { DashboardComponent } from './smartjobs/components/dashboard/dashboard.component';
import { HrdashboardComponent } from './smartjobs/components/hrdashboard/hrdashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
=======
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { FeaturesComponent } from './components/features/features.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { from } from 'rxjs';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
>>>>>>> 087c0ce81bdb2115040f7895a355f3f0d04cf57b
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
