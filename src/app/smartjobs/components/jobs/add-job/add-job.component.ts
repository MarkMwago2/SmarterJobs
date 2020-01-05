import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import {
  ProfileService
} from '../../../services/profile.service';
import {
  JobsService
} from '../../../services/jobs.service';
import {
  Router
} from '@angular/router';

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

export interface Industry {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddJobComponent implements OnInit {

  @ViewChild('resetAddJobForm', {static: false}) myNgForm;
  inds: Industry[] = [
    {value: 'Agriculture and Farming', viewValue: 'Agriculture and Farming'},
    {value: 'Building and Construction', viewValue: 'Building and Construction'},
  ];
  error: any;
  isLoading: boolean;
  AddJobForm: FormGroup;
  companyId: any;
  userId: any;

  addJobMessages = {
    job_title: [{
        type: 'required',
        message: 'Job title is required'
      },
      {
        type: 'pattern',
        message: 'Job title must contain only letters'
      },
    ],
    experience_level: [{
      type: 'required',
      message: 'Experience level is required'
    }],
    minimum_qualification: [{
        type: 'required',
        message: 'Minimum qualification is required'
      },
    ],
    industry: [{
      type: 'required',
      message: 'Experience level is required'
    }],
    experience_length: [{
      type: 'required',
      message: 'Experience length is required'
    }],
    job_description: [{
      type: 'required',
      message: 'Job description is required'
    }],
    duties_and_responsibilities: [{
      type: 'required',
      message: 'Duties and responsibilities is required'
    }],
    requirements: [{
      type: 'required',
      message: 'Requirements is required'
    }]
  };

  constructor(
    private router: Router,
    private prof: ProfileService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private jobs: JobsService,
  ) { }

  ngOnInit() {
    this.createForms();
    this.showCreate();
    this.getCompany();
  }

  createForms() {
    // user links form validations
    this.AddJobForm = this.fb.group({
      job_title: new FormControl('', Validators.compose([
        Validators.pattern('^[a-zA-Z ]+$'),
        Validators.required
      ])),
      minimum_qualification: new FormControl('', Validators.required),
      experience_level: new FormControl('', Validators.required),
      experience_length: new FormControl('', Validators.required),
      job_description: new FormControl('', Validators.required),
      duties_and_responsibilities: new FormControl('', Validators.required),
      industry: new FormControl('', Validators.required),
      requirements: new FormControl('', Validators.required),
      other_details: new FormControl('')
    });
  }

  onSubmitAddJobs(value) {
    value.company = this.companyId;
    this.isLoading = true;
    this.jobs.createJob(value).subscribe(
      res => {
        console.log(value);
        this.showSuccess(value.job_title);
        this.router.navigate(['home']);
      }, err => {
        this.showFailure();
      }
    );
  }

  showSuccess(title) {
    this.toastr.success('Job with' + title + ' created' , 'Add Successful!', {
      progressAnimation: 'increasing',
      timeOut: 5000,
      tapToDismiss: true,
      easing: 'ease-in'
    });
    this.isLoading = false;
  }

  showCreate() {
    this.toastr.info('Fill in the form below with details about the job', 'Add job', {
      progressAnimation: 'increasing',
      timeOut: 5000,
      tapToDismiss: true,
      easing: 'ease-in'
    });
    this.isLoading = false;
  }

  showFailure() {
    this.toastr.error('Job has not been added' + 'Check the details and try again', 'Add Unsuccessful!', {
      progressAnimation: 'increasing',
      timeOut: 4000,
      tapToDismiss: true,
      easing: 'ease-in'
    });
    this.isLoading = false;
  }

  getCompany() {
    this.userId = this.prof.loggedInUserId();
    this.prof.getcompanyprofileByUserId(this.userId).subscribe(
      res => {
        this.companyId = res.id;
      },
      error => {
        console.log(error);
      }
    );
  }

  /* Reset form */
  resetForm() {
    this.AddJobForm.reset();
    Object.keys(this.AddJobForm.controls).forEach(key => {
      this.AddJobForm.controls[key].setErrors(null);
    });
  }

}
