import { Component, OnInit,
  ViewEncapsulation } from '@angular/core';
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
import {MatSelect} from '@angular/material/select';

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import {
  Country,
  UsernameValidator,
  PasswordValidator,
  ParentErrorStateMatcher,
  PhoneValidator
} from '../../../../shared/validators';

import {
  ToastrService
} from 'ngx-toastr';

export interface Employee {
  value: string;
  viewValue: string;
}

export interface Industry {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-company-profile',
  templateUrl: './create-company-profile.component.html',
  styleUrls: ['./create-company-profile.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class CreateCompanyProfileComponent implements OnInit {

  parentErrorStateMatcher = new ParentErrorStateMatcher();


  // userId = this.prof.loggedInUserId();
  // companyprofile: any = {
  //   user: this.userId,
  // };
  industries: any[];
  isLoaded = false;
  types$;
  error: any;
  isLoading: boolean;
  accountDetailsForm: FormGroup;

  account_validation_messages = {
    companyname: [{
        type: 'required',
        message: 'Company name is required'
      },
      {
        type: 'minlength',
        message: 'Company name must be at least 5 characters long'
      },
      {
        type: 'maxlength',
        message: 'Company name cannot be more than 25 characters long'
      },
      {
        type: 'pattern',
        message: 'Your Company name must contain only letters'
      },
      {
        type: 'validCompanyname',
        message: 'Your Company name has already been taken'
      }
    ],
    email: [{
        type: 'required',
        message: 'Email is required'
      },
      {
        type: 'pattern',
        message: 'Enter a valid email'
      }
    ],
    physicaladdress: [{
      type: 'required',
      message: 'Physical Address is required'
    }],
    postaladdress: [{
      type: 'required',
      message: 'Postal Address is required'
    }],
    website: [{
      type: 'required',
      message: 'Website is required'
    }],
    phonenumber: [{
      type: 'required',
      message: 'Phone Number is required'
    }],
    contactPersonName: [{
      type: 'required',
      message: 'Contact Person Name is required'
    }],
    contactPersonTitle: [{
      type: 'required',
      message: 'Contact Person Title is required'
    }],
    contactPersonEmail: [{
      type: 'required',
      message: 'Contact Person Email is required'
    },
    {
      type: 'pattern',
      message: 'Enter a valid email'
    }],
    contactPersonPhoneNumber: [{
      type: 'required',
      message: 'Contact Person Phone Number is required'
    }],
    employees: [{
      type: 'required',
      message: 'Number of Employees is required'
    }],
    industriy: [{
      type: 'required',
      message: 'Industry is required'
    }]

  };

  employees: Employee[] = [
    {value: '0-20', viewValue: '0-20'},
    {value: '20-50', viewValue: '20-50'},
    {value: '50-100', viewValue: '50-100'},
    {value: '100-200', viewValue: '100-200'},
    {value: '200-300', viewValue: '200-300'},
    {value: '300-400', viewValue: '300-400'},
    {value: '400-500', viewValue: '400-500'},
    {value: '500-600', viewValue: '500-600'},
    {value: '600-700', viewValue: '600-700'},
    {value: '700-800', viewValue: '700-800'},
    {value: '800-900', viewValue: '800-900'},
    {value: '900-1000', viewValue: '900-1000'},
    {value: '1000-2000', viewValue: '1000-2000'},
    {value: '2000-3000', viewValue: '2000-3000'},
    {value: '3000-4000', viewValue: '3000-4000'},
    {value: '4000-5000', viewValue: '4000-5000'},
    {value: '5000-6000', viewValue: '5000-6000'},
    {value: '6000-7000', viewValue: '6000-7000'},
    {value: '7000-8000', viewValue: '7000-8000'},
    {value: '8000-9000', viewValue: '8000-9000'},
    {value: '9000-10000', viewValue: '9000-10000'},
    {value: 'Over 10000', viewValue: 'Over 10000'},

  ];

  inds: Industry[] = [
    {value: 'Agriculture and Farming', viewValue: 'Agriculture and Farming'},
    {value: 'Building and Construction', viewValue: 'Building and Construction'},
  ];

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


  constructor(
    private authService: AuthService,
    private router: Router,
    private prof: ProfileService,
    private indu: IndustryService,
    private fb: FormBuilder, private toastr: ToastrService,
  ) { }

  // getIndustries() {
  //   return this.indu.industries();
  // }

  ngOnInit() {
    this.createForms();
    this.showCreate();
    // this.types$ = this.getIndustries();
  }

  createForms() {

    // user links form validations
    this.accountDetailsForm = this.fb.group({
      companyname: new FormControl('', Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^[a-zA-Z ]+$'),
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(this.emailPattern)
      ])),
      physicaladdress: new FormControl('', Validators.required),
      postaladdress: new FormControl('', Validators.required),
      phonenumber: new FormControl('', Validators.required),
      website: new FormControl('', Validators.required),
      industry: new FormControl('', Validators.required),
      employees: new FormControl('', Validators.required),
      contactPersonName: new FormControl('', Validators.required),
      contactPersonTitle: new FormControl('', Validators.required),
      contactPersonEmail: new FormControl('', Validators.required),
      contactPersonPhoneNumber: new FormControl('', Validators.required),
    });

  }
  onSubmitAccountDetails(value) {
    value.user = '';
    this.isLoading = true;
    this.prof.createcompanyprofile(value).subscribe(
      res => {
        console.log(value);
        this.showSuccess(value.companyname);
        this.router.navigate(['home']);
      }, err => {
        this.showFailure();
      }
    );
  }

  showSuccess(username) {
    this.toastr.success('Account for ' + username + ' created' + 'Someone from our team will contact you for the next steps' + 'Thank You!', 'Registration Successful!', {
      progressAnimation: 'increasing',
      timeOut: 5000,
      tapToDismiss: true,
      easing: 'ease-in'
    });
    this.isLoading = false;
  }

  showCreate() {
    this.toastr.info('Fill in the form below with details about your company', 'Create Company Profile', {
      progressAnimation: 'increasing',
      timeOut: 5000,
      tapToDismiss: true,
      easing: 'ease-in'
    });
    this.isLoading = false;
  }

  showFailure() {
    this.toastr.error('Company profile has been not created' + 'Check the details and try again', 'Create Unsuccessful!', {
      progressAnimation: 'increasing',
      timeOut: 4000,
      tapToDismiss: true,
      easing: 'ease-in'
    });
    this.isLoading = false;
  }

}
