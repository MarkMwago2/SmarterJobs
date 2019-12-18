import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { AuthService } from '../../../services/auth.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  profile: any = {
    telephone: '',
    name: '',
    role: '',
    county: '',
    dependence: '',
    next_of_kin: '',
    cumulative_experience: '',
    national_id: '',
    Availability_status: '',
    academic_qualifications: '',
    professional_qualification: '',
    skills: ''
  };

  constructor(
    private http: HttpClient,
    private prof: ProfileService,
    private authservice: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.prof.updateProfile(this.profile).subscribe(
      res => {
        console.log('update successful');
        this.router.navigate(['profile']);
      }, err => {
        console.log('update unsuccessful');
      }
    );
  }

}
