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
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {
  userId = this.prof.loggedInUserId();
  types$;
  company: any = [];
  companyId: any;
  files  = [];
  fileToUpload: File = null;

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
      console.log(company);
      this.companyId = company.id;
      this.company.push(company);
    }, error => {
      console.log('Retrieve Unsuccessful');
    });
  }

  uploadFile(file) {
    const formData = new FormData();
    formData.append('logo', file.data);
    file.inProgress = true;
    this.prof.uploadCompany(this.companyId, formData).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        return of(`${file.data.name} upload failed.`);
      })).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          console.log(event.body);
        }
        location.reload();
      });
  }

  private uploadFiles() {
    // this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.files.push({ data: this.fileToUpload, inProgress: false, progress: 0});
    this.uploadFiles();
  }

}
