import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
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

export interface Industry {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditJobComponent implements OnInit {

  @ViewChild('resetAddJobForm', {static: false}) myNgForm;
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
  jobId: any;
  job = [];

  addJobMessages = {
    job_title: [
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
    private actRoute: ActivatedRoute,
    private location: Location,
  ) {
  }

  ngOnInit() {
    this.jobId = this.actRoute.snapshot.paramMap.get('id');

    this.showCreate();
    this.getCompany();
    this.getJobById(this.jobId);
  }

  createForms() {
    // user links form validations
    this.AddJobForm = this.fb.group({
      job_title: new FormControl(this.job[0].job_title, Validators.compose([
        Validators.pattern('^[a-zA-Z ]+$'),
        Validators.required
      ])),
      minimum_qualification: new FormControl(this.job[0].minimum_qualification, Validators.required),
      experience_level: new FormControl(this.job[0].experience_level, Validators.required),
      experience_length: new FormControl(this.job[0].experience_length, Validators.required),
      job_description: new FormControl(this.job[0].job_description, Validators.required),
      duties_and_responsibilities: new FormControl(this.job[0].duties_and_responsibilities, Validators.required),
      industry: new FormControl(this.job[0].industry, Validators.required),
      requirements: new FormControl(this.job[0].requirements, Validators.required),
      other_details: new FormControl(this.job[0].other_details),
      location: new FormControl(this.job[0].location, Validators.required),
      application_deadline: new FormControl(this.job[0].application_deadline, Validators.required),
      jobType: new FormControl(this.job[0].jobType, Validators.required)
    });
  }

  onSubmitAddJobs(value) {
    value.company = this.companyId;
    console.log(value);
    this.isLoading = true;
    this.jobs.editJobByID(value, this.jobId).subscribe(
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
    this.toastr.success('Job with' + title + ' updated' , 'Update Successful!', {
      progressAnimation: 'increasing',
      timeOut: 5000,
      tapToDismiss: true,
      easing: 'ease-in'
    });
    this.isLoading = false;
  }

  showCreate() {
    this.toastr.info('Edit the form below with details about the job', 'Edit job', {
      progressAnimation: 'increasing',
      timeOut: 5000,
      tapToDismiss: true,
      easing: 'ease-in'
    });
    this.isLoading = false;
  }

  showFailure() {
    this.toastr.error('Job has not been edited' + 'Check the details and try again', 'Edit Unsuccessful!', {
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

  getJobById(jobID) {
    this.jobs.getJobByID(jobID).subscribe(
      res => {
        this.job.push(res);
        console.log(this.job);
        this.createForms();
      },
      error => {
        console.error(error);
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
