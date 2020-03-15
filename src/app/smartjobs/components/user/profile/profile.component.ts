import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { JobsService } from '../../../services/jobs.service';
import { AuthService } from '../../../services/auth.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

import { Packer } from 'docx';
import { saveAs } from 'file-saver';

import { experiences, education, skills, achievements } from './cv-data';
import { DocumentCreator } from './cv-generator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('fileUpload', {static: true}) fileUpload: ElementRef;
  files  = [];
  fileToUpload: File = null;
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
        // console.log(company);
        this.prof.user().subscribe(user => {
          user = user;
          // console.log(contract);
          const date1 = new Date(contract[0].startdate);
          const date2 = new Date(contract[0].enddate);

          // To calculate the time difference of two dates
          // tslint:disable-next-line: variable-name
          const Difference_In_Time = date2.getTime() - date1.getTime();

          // To calculate the no. of days between two dates
          // tslint:disable-next-line: variable-name
          const Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24 * 30 * 12));
          contract[0].contractLength = Difference_In_Days;
          // console.log(contract[0].contractLength);
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

  public download(): void {
    const documentCreator = new DocumentCreator();
    const doc = documentCreator.create([
      experiences,
      education,
      skills,
      achievements
    ]);

    Packer.toBlob(doc).then(blob => {
      console.log(blob);
      saveAs(blob, 'example.docx');
      console.log('Document created successfully');
    });
  }

  uploadFile(file) {
    const formData = new FormData();
    formData.append('photo', file.data);
    file.inProgress = true;
    this.prof.upload(formData).pipe(
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
    // const fileUpload = this.fileUpload.nativeElement.files;
    // fileUpload.onchange = () => {
    //   fileUpload.files.array.forEach((element, index) => {
    //     const file = fileUpload.files[index];
    //     this.files.push({ data: file, inProgress: false, progress: 0});
    //   });
    //   this.uploadFiles();
    // };
    // fileUpload.click();
  }

//   handleFileInput(files: FileList) {
//     this.fileToUpload = files.item(0);
// }

}
