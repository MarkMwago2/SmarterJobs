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
export interface Exlevel {
  value: string;
  viewValue: string;
}
export interface Exlength {
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
  exlvs: Exlevel[] = [
    {value: 'Entry', viewValue: 'Entry'},
    {value: 'Supervisory', viewValue: 'Supervisory'},
    {value: 'Low Management', viewValue: 'Low Management'},
    {value: 'Mid Management', viewValue: 'Mid Management'},
    {value: 'Upper Management', viewValue: 'Upper Management'},
    {value: 'Executive Management', viewValue: 'Executive Management'},
  ];
  exlng: Exlength[] = [
    {value: 'Less than 1 year', viewValue: 'Less than 1 year'},
    {value: '1 year', viewValue: '1 year'},
    {value: '2 years', viewValue: '2 years'},
    {value: '3 years', viewValue: '3 years'},
    {value: '4 years', viewValue: '4 years'},
    {value: '5 years', viewValue: '5 years'},
    {value: '6 years', viewValue: '6 years'},
    {value: '7 years', viewValue: '7 years'},
    {value: '8 years', viewValue: '8 years'},
    {value: '9 years', viewValue: '9 years'},
    {value: '10 years', viewValue: '10 years'},
    {value: '11 years', viewValue: '11 years'},
    {value: '12 years', viewValue: '12 years'},
    {value: '13 years', viewValue: '13 years'},
    {value: '14 years', viewValue: '14 years'},
    {value: '15 years', viewValue: '15 years'},
    {value: 'Above 15 years', viewValue: 'Above 15 years'},
  ];
  inds: Industry[] = [
    {value: 'Advertising and Marketing', viewValue: 'Advertising and Marketing'},
    {value: 'Agriculture and Farming', viewValue: 'Agriculture and Farming'},
    {value: 'Automotive and Aviation', viewValue: 'Automotive and Aviation'},
    {value: 'Banking, Finance & Insurance', viewValue: 'Banking, Finance & Insurance'},
    {value: 'Building and Construction', viewValue: 'Building and Construction'},
    {value: 'Digital, Media & Communications', viewValue: 'Digital, Media & Communications'},
    {value: 'Education & Training', viewValue: 'Education & Training'},
    {value: 'Energy and Utilities', viewValue: 'Energy and Utilities'},
    {value: 'Entertainment and Events', viewValue: 'Entertainment and Events'},
    {value: 'Government', viewValue: 'Government'},
    {value: 'Health', viewValue: 'Health'},
    {value: 'Hospitality and Hotel', viewValue: 'Hospitality and Hotel'},
    {value: 'Internet and Telecommunications', viewValue: 'Internet and Telecommunications'},
    {value: 'Law ', viewValue: 'Law '},
    {value: 'Law Enforcement and Security', viewValue: 'Law Enforcement and Security'},
    {value: 'Logistics anbd Transportation', viewValue: 'Logistics anbd Transportation'},
    {value: 'Manufacturing', viewValue: 'Manufacturing'},
    {value: 'NGO', viewValue: 'NGO'},
    {value: 'Real Estate', viewValue: 'Real Estate'},
    {value: 'Recruitment', viewValue: 'Recruitment'},
    {value: 'Retail & Fashion', viewValue: 'Retail & Fashion'},
    {value: 'Technology', viewValue: 'Technology'},
    {value: 'Tourism, Travel & Leisure', viewValue: 'Tourism, Travel & Leisure'}
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
    }],
    location: [{
      type: 'required',
      message: 'location is required'
    }],
    application_deadline: [{
      type: 'required',
      message: 'Application Deadline is required'
    }],
    jobType: [{
      type: 'required',
      message: 'Job type is required'
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
      other_details: new FormControl(''),
      location: new FormControl('', Validators.required),
      application_deadline: new FormControl('', Validators.required),
      jobType: new FormControl('', Validators.required)
    });
  }

  onSubmitAddJobs(value) {
    value.company = this.companyId;
    this.isLoading = true;
    console.log(value);
    this.jobs.createJob(value).subscribe(
      res => {
        console.log(value);
        this.showSuccess(value.job_title);
        this.router.navigate(['agency-jobs']);
      }, err => {
        this.showFailure();
      }
    );
  }

  showSuccess(title) {
    this.toastr.success('Vacancy with title: ' + title + 'has been added' , 'Add Successful!', {
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
