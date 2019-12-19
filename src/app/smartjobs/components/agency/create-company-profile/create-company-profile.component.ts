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

  constructor(
    private authService: AuthService,
    private router: Router,
    private prof: ProfileService,
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.prof.createcompanyprofile(this.companyprofile).subscribe(
      res => {
        console.log('update successful');
        this.router.navigate(['company-profile']);
      }, err => {
        console.log('update unsuccessful');
      }
    );
  }

}
