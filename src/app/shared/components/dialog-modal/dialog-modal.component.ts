import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {
  ToastrService
} from 'ngx-toastr';
import {
  JobsService
} from '../../../smartjobs/services/jobs.service';
import {
  ProfileService
} from '../../../smartjobs/services/profile.service';

export interface Availability {
  value: string;
  viewValue: string;
}

export interface Salary {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dialog-modal',
  templateUrl: './dialog-modal.component.html',
  styleUrls: ['./dialog-modal.component.css']
})
export class DialogModalComponent implements OnInit {
  salaries: Salary[] = [
    {value: 'Below 10000', viewValue: 'Below 10000'},
    {value: '10000-20000', viewValue: '10000-20000'},
    {value: '20000-30000', viewValue: '20000-30000'},
    {value: '30000-40000', viewValue: '30000-40000'},
    {value: '40000-50000', viewValue: '40000-50000'},
    {value: '50000-60000', viewValue: '50000-60000'},
    {value: '60000-70000', viewValue: '60000-70000'},
    {value: '70000-80000', viewValue: '70000-80000'},
    {value: '80000-90000', viewValue: '80000-90000'},
    {value: '90000-100000', viewValue: '90000-100000'},
    {value: '100000-120000', viewValue: '100000-120000'},
    {value: '120000-140000', viewValue: '120000-140000'},
    {value: '140000-160000', viewValue: '140000-160000'},
    {value: '160000-180000', viewValue: '160000-180000'},
    {value: 'Above 200000', viewValue: 'Above 200000'},
  ];
  availabilities: Availability[] = [
    {value: 'Immediately', viewValue: 'Immediately'},
    {value: 'After 1 Day', viewValue: 'Afte 1 Day'},
    {value: 'After 2 Days', viewValue: 'After 2 Days'},
    {value: 'After 3 Days', viewValue: 'After 3 Days'},
    {value: 'After 1 week', viewValue: 'After 1 week'},
    {value: 'After 2 weeks', viewValue: 'After 2 weeks'},
    {value: 'After 3 weeks', viewValue: 'After 3 weeks'},
    {value: 'After 1 Month', viewValue: 'After 1 Month'}
  ];
  jobID: string;
  isLoading: boolean;
  userId: any;

  constructor(public dialogRef: MatDialogRef<DialogModalComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService,     private jobs: JobsService, private prof: ProfileService, ) {
      this.jobID = data.pageValue;
    }

  ngOnInit() {
  }
  onConfirmClick(value) {
    this.dialogRef.close(true);
    this.applyJobById(value, this.jobID);

  }
  showSuccess() {
    this.toastr.success('You have applied for this job' , 'Application Successful!', {
      progressAnimation: 'increasing',
      timeOut: 5000,
      tapToDismiss: true,
      easing: 'ease-in'
    });
    this.isLoading = false;
  }
  showFailure() {
    this.toastr.error('Your application for this job was not successful', 'Application Unsuccessful!', {
      progressAnimation: 'increasing',
      timeOut: 4000,
      tapToDismiss: true,
      easing: 'ease-in'
    });
    this.isLoading = false;
  }
  applyJobById(value, jobID) {
    this.userId = this.prof.loggedInUserId();
    this.jobs.getJobByID(jobID).subscribe(
      res => {
        this.showSuccess();
      },
      error => {
        this.showFailure();
      }
    );
  }

}
