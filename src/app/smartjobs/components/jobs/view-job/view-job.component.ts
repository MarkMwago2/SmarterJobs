import { Component, OnInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { VERSION, MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import {
  JobsService
} from '../../../services/jobs.service';
import {
  ProfileService
} from '../../../services/profile.service';
import {
  Router, ActivatedRoute
} from '@angular/router';
import { Location } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatPaginator, MatToolbarModule } from '@angular/material';
import {MatTooltipModule, MatTooltip} from '@angular/material/tooltip';
import {MatSelect} from '@angular/material/select';
import {
  ToastrService
} from 'ngx-toastr';
import { DialogModalComponent } from '../../../../shared/components/dialog-modal/dialog-modal.component';


export interface Availability {
  value: string;
  viewValue: string;
}

export interface Salary {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.css']
})
export class ViewJobComponent implements OnInit {
  @ViewChild('resetAddJobForm', {static: false}) myNgForm;
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
  error: any;
  isLoading: boolean;
  companyId: any;
  userId: any;
  jobId: any;
  jobList = [];
  applicationForm: FormGroup;

  constructor(private router: Router,
              private prof: ProfileService,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private jobs: JobsService,
              private actRoute: ActivatedRoute,
              private location: Location,
              public dialog: MatDialog,
              private snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.jobId = this.actRoute.snapshot.paramMap.get('id');
    this.getJobById(this.jobId);
    this.createForms();
  }
  getJobById(jobID) {
    this.jobs.getJobByID(jobID).subscribe(
      res => {
        this.jobList.push(res);
        console.log(this.jobList);
      },
      error => {
        console.error(error);
      }
    );
  }
  onConfirmClick(value) {
    console.log(value)
    // this.applyJobById(value, this.jobId);
  }

  createForms() {
    // user links form validations
    this.applicationForm = this.fb.group({
      availability: new FormControl('', Validators.required),
      expected_salary: new FormControl('', Validators.required),
      terms: new FormControl(false, Validators.pattern('true'))
    });
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

  /* Reset form */
  resetForm() {
    this.applicationForm.reset();
    Object.keys(this.applicationForm.controls).forEach(key => {
      this.applicationForm.controls[key].setErrors(null);
    });
  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(DialogModalComponent, {
  //     width: '250px',
  //     backdropClass: 'custom-dialog-backdrop-class',
  //     panelClass: 'custom-dialog-panel-class',
  //     data: {pageValue: this.jobId}
  //   });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed', result);
    //   this.snackBar.open('Application Cancelled', 'Closed', {
    //     duration: 2000,
    //   });
    // });
  }

