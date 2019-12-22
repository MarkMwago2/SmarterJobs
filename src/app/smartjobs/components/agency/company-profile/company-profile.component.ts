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
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {
  userId = this.prof.loggedInUserId();
  types$;
  company: any = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private prof: ProfileService,
    private indu: IndustryService,
  ) { }

  getIndustries() {
    return this.indu.industries();
  }

  getCompanyProfile(userId) {
    return this.prof.getcompanyprofileByUserId(userId);
  }

  ngOnInit() {
    this.prof.getcompanyprofileByUserId(this.userId).subscribe(company => {
      company = company;
      let industryId = company['industry'];
      this.indu.getindustry(industryId).subscribe(industry => {
        industry = industry;
        var str = JSON.stringify(industry);
        str = str.replace(/name/g, 'industry_name');
        let industryInfo = JSON.parse(str);
        const companyinfo = Object.assign({}, company, industryInfo);
        this.company.push(companyinfo);
        console.log(this.company);
      })
    }, error => {
      console.log('Retrieve Unsuccessful')
    })
    // this.types$ = this.getIndustries();
  }

}
