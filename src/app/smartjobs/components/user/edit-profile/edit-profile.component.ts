import {
  Component,
  OnInit,
  Input, ViewEncapsulation,
  forwardRef,
  NgZone, ViewChild
} from '@angular/core';
import {
  ProfileService
} from '../../../services/profile.service';
import {
  AuthService
} from '../../../services/auth.service';
import {
  HttpHeaders,
  HttpClient
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';
import {
  CanActivate,
  Router
} from '@angular/router';

import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormGroup,
  FormBuilder,
  Validator,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import {
  environment
} from '../../../../../environments/environment';
import {
  CloudinaryOptions,
  CloudinaryUploader
} from 'ng2-cloudinary';
import { MatPaginator, MatToolbarModule } from '@angular/material';
import {MatTooltipModule, MatTooltip} from '@angular/material/tooltip';
import {MatSelect} from '@angular/material/select';

import {
  Country,
  UsernameValidator,
  PasswordValidator,
  ParentErrorStateMatcher,
  PhoneValidator
} from '../../../../shared/validators';
export interface FormData {
  name: string;
  page: number;
  display: boolean;
}

export interface Gender {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class EditProfileComponent implements OnInit {

  parentErrorStateMatcher = new ParentErrorStateMatcher();

  accountDetailsForm: FormGroup;
  workExperienceForm: FormGroup;
  academicQualificationForm: FormGroup;
  refereeForm: FormGroup;

  formData: FormData[] = [];
  isLastPage = false;

  showTab = 1;
  showRef = 1;
  showAca = 1;
  showWex = 1;

  genders: Gender[] = [
    {value: 'Female', viewValue: 'Female'},
    {value: 'Male', viewValue: 'Male'},
    {value: 'Rather Not Say', viewValue: 'Rather Not Say'},
  ];

  account_validation_messages = {
    companyname: [{
        type: 'required',
        message: 'Companyname is required'
      },
      {
        type: 'minlength',
        message: 'Companyname must be at least 5 characters long'
      },
      {
        type: 'maxlength',
        message: 'Companyname cannot be more than 25 characters long'
      },
      {
        type: 'pattern',
        message: 'Your Companyname must contain only letters'
      },
      {
        type: 'validCompanyname',
        message: 'Your Companyname has already been taken'
      }
    ],
    lastname: [{
      type: 'required',
      message: 'lastname is required'
    },
    {
      type: 'minlength',
      message: 'lastname must be at least 5 characters long'
    },
    {
      type: 'maxlength',
      message: 'lastname cannot be more than 25 characters long'
    },
    {
      type: 'pattern',
      message: 'Your lastname must contain only letters'
    },
    {
      type: 'validlastname',
      message: 'Your lastname has already been taken'
    }
  ],
    firstname: [{
      type: 'required',
      message: 'firstname is required'
    },
    {
      type: 'minlength',
      message: 'firstname must be at least 5 characters long'
    },
    {
      type: 'maxlength',
      message: 'firstname cannot be more than 25 characters long'
    },
    {
      type: 'pattern',
      message: 'Your firstname must contain only letters'
    },
    {
      type: 'validfirstname',
      message: 'Your firstname has already been taken'
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
    IDnumber: [{
      type: 'required',
      message: 'National Identification is required'
    }],
    nationality: [{
      type: 'required',
      message: 'Nationality is required'
    }],
    gender: [{
      type: 'required',
      message: 'Gender is required'
    }],
    phonenumber: [{
      type: 'required',
      message: 'Phone Number is required'
    }],
    address: [{
      type: 'required',
      message: 'Address is required'
    }],
    wCompanyname: [{
      type: 'required',
      message: 'Company Name is required'
    }],
    duties: [{
      type: 'required',
      message: 'Duties and Responsibility is required'
    }],
    institutionname: [{
      type: 'required',
      message: 'Institution name is required'
    }],
    merit: [{
      type: 'required',
      message: 'Qualification is required'
    }],
    refereeEmail: [{
      type: 'pattern',
      message: 'Enter a valid email'
    }],
    refereePhonenumber: [{
      type: 'pattern',
      message: 'Enter a valid phone'
    }]

  };


  constructor(
    private http: HttpClient,
    private prof: ProfileService,
    private authservice: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.createForms();
  }

  createForms() {
    this.workExperienceForm = new FormGroup({
      wCompanyname: new FormControl('', Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$'),
        Validators.required
      ])),
      Pstartdate: new FormControl('', Validators.required),
      Penddate: new FormControl('', Validators.required),
      duties: new FormControl('', Validators.required),
      wCompanyname1: new FormControl('', Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$')
      ])),
      Pstartdate1: new FormControl(''),
      Penddate1: new FormControl(''),
      duties1: new FormControl(''),
      wCompanyname2: new FormControl('', Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$')
      ])),
      Pstartdate2: new FormControl(''),
      Penddate2: new FormControl(''),
      duties2: new FormControl(''),
    }, (formGroup: FormGroup) => {
      return formGroup;
    });
    this.academicQualificationForm = new FormGroup({
      institutionname: new FormControl('', Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$'),
        Validators.required
      ])),
      Astartdate: new FormControl('', Validators.required),
      Aenddate: new FormControl('', Validators.required),
      merit: new FormControl('', Validators.required),
      institutionname1: new FormControl('', Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$'),
      ])),
      Astartdate1: new FormControl(''),
      Aenddate1: new FormControl(''),
      merit1: new FormControl(''),
      institutionname2: new FormControl('', Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$'),
      ])),
      Astartdate2: new FormControl(''),
      Aenddate2: new FormControl(''),
      merit2: new FormControl(''),
    }, (formGroup: FormGroup) => {
      return formGroup;
    });
    this.refereeForm = new FormGroup({
      refereetitle: new FormControl('', Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$'),
        Validators.required
      ])),
      refereefname: new FormControl('', Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$'),
        Validators.required
      ])),
      refereelname: new FormControl('', Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$'),
        Validators.required
      ])),
      refereeAddress: new FormControl('', Validators.required),
      refereeEmail: new FormControl('', Validators.compose([
        Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$')
      ])),
      refereePhonenumber: new FormControl('', Validators.compose([
        Validators.pattern('^((\\+254-?)|0)?[0-9]{10}$'),
        Validators.maxLength(12),
        Validators.minLength(10),
      ])),
      refereetitle1: new FormControl('', Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$'),
      ])),
      refereefname1: new FormControl('', Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$'),
      ])),
      refereelname1: new FormControl('', Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$'),
      ])),
      refereeAddress1: new FormControl(''),
      refereeEmail1: new FormControl('', Validators.compose([
        Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$')
      ])),
      refereePhonenumber1: new FormControl('', Validators.compose([
        Validators.pattern('^((\\+254-?)|0)?[0-9]{10}$'),
        Validators.maxLength(12),
        Validators.minLength(10),
      ])),
      refereetitle2: new FormControl('', Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$')
      ])),
      refereefname2: new FormControl('', Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$')
      ])),
      refereelname2: new FormControl('', Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$')
      ])),
      refereeAddress2: new FormControl(''),
      refereeEmail2: new FormControl('', Validators.compose([
        Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$')
      ])),
      refereePhonenumber2: new FormControl('', Validators.compose([
        Validators.pattern('^((\\+254-?)|0)?[0-9]{10}$'),
        Validators.maxLength(12),
        Validators.minLength(10),
      ])),
    }, (formGroup: FormGroup) => {
      return formGroup;
    });
    this.accountDetailsForm = this.fb.group({
      firstname: new FormControl('', Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$'),
        Validators.required
      ])),
      lastname: new FormControl('', Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$'),
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$')
      ])),
      IDnumber: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]+$'),
        Validators.maxLength(8),
        Validators.minLength(7),
      ])),
      phonenumber: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^((\\+254-?)|0)?[0-9]{10}$'),
        Validators.maxLength(12),
        Validators.minLength(10),
      ])),
      dateofbirth: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      nationality: new FormControl('', Validators.required),
      workexperience: this.workExperienceForm,
      academicQualification: this.academicQualificationForm,
      pqualification: new FormControl(''),
      skills: new FormControl(''),
      membership: new FormControl(''),
      referees: this.refereeForm,
    });
  }

  onSubmitAccountDetails(value) {
    console.log(value);
  }
  tabToggle(index) {
    this.showTab = index;
  }
  showReferee() {
    if (this.showRef < 3) {
      this.showRef++;
    }
    console.log(this.showRef);
  }
  showAcademia() {
    if (this.showAca < 3) {
      this.showAca++;
    }
    this.showAca;
    console.log(this.showAca);
  }
  showWorkEx() {
    if (this.showWex < 3) {
      this.showWex++;
    }
    this.showWex;
    console.log(this.showWex);
  }
}
