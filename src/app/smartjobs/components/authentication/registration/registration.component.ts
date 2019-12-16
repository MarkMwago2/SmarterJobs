import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  error: any;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }
  register(username: string, email: string, password: string) {
    this.authService.signup(username, email, password).subscribe(
      success => this.router.navigate(['sign-in']),
      error => this.error = error
    );
  }

}
