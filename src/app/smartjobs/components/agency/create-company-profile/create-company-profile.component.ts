import { Component, OnInit } from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  AuthService
} from '../../../services/auth.service';
import {
  ProfileService
} from '../../../services/profile.service';
import { IndustryService } from '../../../services/industry.service';


@Component({
  selector: 'app-create-company-profile',
  templateUrl: './create-company-profile.component.html',
  styleUrls: ['./create-company-profile.component.css']
})
export class CreateCompanyProfileComponent implements OnInit {
  userId = this.prof.loggedInUserId();
  companyprofile: any = {
    user: this.userId,
  };
  industries: any[];
  isLoaded = false;
  types$;

  constructor(
    private authService: AuthService,
    private router: Router,
    private prof: ProfileService,
    private indu: IndustryService,
  ) { }

  getIndustries() {
    return this.indu.industries();
  }

  ngOnInit() {
    this.types$ = this.getIndustries();
  }

  onSubmit() {
    this.prof.createcompanyprofile(this.companyprofile).subscribe(
      res => {
        this.router.navigate(['company-profile']);
      }, err => {
        console.log('update unsuccessful');
      }
    );
  }

}
