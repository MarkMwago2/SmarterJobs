import {
  Component,
  OnInit
} from '@angular/core';
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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: any;
  profile: any = {};
  profileComplete = 0;
  user: any = {};
  company: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private prof: ProfileService,
  ) {}

  ngOnInit() {}

  login(email: string, password: string) {
    this.authService.login(email, password).subscribe(
      success => {
        this.prof.userprofile().subscribe(profile => {
          profile = profile;
          this.prof.user().subscribe(user => {
            user = user;
            if (user.groups[0] === 1) {
              const total = Object.keys(profile).length;
              let completeEntries = 0;
              for (const key in profile) {
                if (profile[key] !== '' && profile[key] !== null && profile[key] !== undefined) {
                  completeEntries++;
                  this.profileComplete = Math.round(100 * completeEntries / total);
                }
              }
              if (this.profileComplete >= 80) {
                this.router.navigate(['home']);
              } else {
                this.router.navigate(['profile']);
              }
            } else {
              this.prof.getAllCompanies().subscribe(company => {
                company = company;
                const user = this.prof.loggedInUserId();
                const companyexists = company.filter(e => e.user.includes(user));
                if (companyexists.length >= 1) {
                  this.router.navigate(['dashboard']);
                } else {
                  this.router.navigate(['create-companyprofile']);
                }
                console.log(companyexists);
              });
              
            }
          });
        });
      },
      error => this.error = error
    );
  }

}
