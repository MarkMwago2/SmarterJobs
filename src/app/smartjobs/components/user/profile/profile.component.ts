import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { AuthService } from '../../../services/auth.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userprofiles: any = [];
  profile: any = {};
  user: any = {};
  profiles: any = {
    telephone: '',
    kra_pin: '',
    name: '',
    role: '',
    county: '',
    staff_id_number: '',
    dependence: '',
    next_of_kin: '',
    cumulative_experience: '',
    photo: '',
    national_id: '',
    Availability_status: '',
    Overall_Rating: '',
    academic_qualifications: '',
    professional_qualification: '',
    skills: ''
  };

  users: any = {
    id: '',
    password: '',
    last_login: '',
    is_superuser: '',
    first_name: '',
    last_name: '',
    is_staff: 'false',
    is_active: 'true',
    date_joined: '',
    username: '',
    email: '',
    groups: [],
    user_permissions: []
  };

  constructor(
    private http: HttpClient,
    private prof: ProfileService,
    private authservice: AuthService,
  ) { }

  ngOnInit() {
    this.prof.userprofile().subscribe(profile => {
      profile = profile;
      this.prof.user().subscribe(user => {
        user = user;
        console.log(user);
        const userinfo = Object.assign({}, profile, user);
        console.log(userinfo);
        this.userprofiles.push(userinfo);
      });
      console.log(profile);
      
    });
    // this.prof.user().subscribe(user => {
    //   user = user;
    //   console.log(user);
    // });
    // const userinfo = Object.assign({}, profile, user);
    // console.log(userinfo);
  }

}
