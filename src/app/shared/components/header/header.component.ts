import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../smartjobs/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  error: any;
  loggedIn: any;
  loggedOut: any;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loggedIn = this.authService.isLoggedIn();
    this.loggedOut = this.authService.isLoggedOut();
  }

  logout() {
    this.authService.logout();
  }
}
