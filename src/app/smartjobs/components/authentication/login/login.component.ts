import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: any;
  profile: any = {};
  profileComplete = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private prof: ProfileService,
  ) { }

  ngOnInit() {
  }

  login(email: string, password: string) {
    this.authService.login(email, password).subscribe(
      success => {
        this.prof.userprofile().subscribe(profile => {
          profile = profile;
          const total = Object.keys(profile).length;
          let completeEntries = 0;
          for (const key in profile) {
            if (profile[key] !== '' && profile[key] !== null && profile[key] !== undefined) {
                completeEntries++;
                this.profileComplete = Math.round(100 * completeEntries / total );
            }
          }
          if (this.profileComplete >= 80) {
            this.router.navigate(['home']);
          } else {
            this.router.navigate(['profile']);
          }
        });
      },
      error => this.error = error
    );
  }

}
