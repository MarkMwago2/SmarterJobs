import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { JobsService } from '../../../services/jobs.service';
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
  profileComplete = 0;
  userId: any;
  contract: any;
  company: any;
  companyId: any;

  constructor(
    private http: HttpClient,
    private prof: ProfileService,
    private authservice: AuthService,
    private jobs: JobsService
  ) { }

  ngOnInit() {
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
      this.userId = this.prof.loggedInUserId();
      this.jobs.getAllContractByUserID(this.userId).subscribe( contract => {
          contract = contract;
          this.companyId = contract[0].company;
          // console.log(this.contract)
          this.prof.getcompanyprofile(this.companyId).subscribe( company => {
        company = company;
        console.log(company);
        this.prof.user().subscribe(user => {
          user = user;
          console.log(contract);
          const date1 = new Date(contract[0].startdate);
          const date2 = new Date(contract[0].enddate);

          // To calculate the time difference of two dates
          let Difference_In_Time = date2.getTime() - date1.getTime();

          // To calculate the no. of days between two dates
          let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24 * 30 *12));
          contract[0].contractLength = Difference_In_Days;
          console.log(contract[0].contractLength);
          profile.workexperience = JSON.parse(JSON.parse(profile.workexperience));
          profile.academicQualification = JSON.parse(JSON.parse(profile.academicQualification));
          profile.referees = JSON.parse(JSON.parse(profile.referees));
          const userinfo = Object.assign({}, profile, user, company, contract[0]);
          this.userprofiles.push(userinfo);
          console.log(this.userprofiles);
        });
      },
        error => {
          console.error();
        }
      );
        },
        error => {
          console.error(error);
        }
      );


    });
  }

}
