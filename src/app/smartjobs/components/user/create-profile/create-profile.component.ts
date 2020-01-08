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
  ToastrService
} from 'ngx-toastr';
import {
  Country,
  UsernameValidator,
  PasswordValidator,
  ParentErrorStateMatcher,
  PhoneValidator
} from '../../../../shared/validators';

export interface Gender {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateProfileComponent implements OnInit {

  parentErrorStateMatcher = new ParentErrorStateMatcher();

  accountDetailsForm: FormGroup;
  workExperienceForm: FormGroup;
  academicQualificationForm: FormGroup;
  refereeForm: FormGroup;

  showTab = 1;
  showRef = 1;
  showAca = 1;
  showWex = 1;

  isLoading: boolean;
  firstname: string;
  lastname: string;
  email: string;
  IDnumber: number;
  phonenumber: number;
  dateofbirth: any;
  address: string;
  gender: string;
  workexperience: {};
  academicQualification: {};
  pqualification: string;
  skills: string;
  membership: string;
  referees: {};

  genders: Gender[] = [
    {value: 'Female', viewValue: 'Female'},
    {value: 'Male', viewValue: 'Male'},
    {value: 'Rather Not Say', viewValue: 'Rather Not Say'},
  ];

  keRegexPattern = /^(?:254|\+254|0)?(7(?:(?:[129][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$/;
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;



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
    profession: [{
      type: 'required',
      message: 'profession is required'
    }],
    refereeEmail: [{
      type: 'pattern',
      message: 'Enter a valid email'
    }],
    refereePhonenumber: [{
      type: 'pattern',
      message: 'Enter a valid phone'
    }],
    startingdate: [{
      type: 'pattern',
      message: 'Starting Date is required'
    }],
    endingdate: [{
      type: 'pattern',
      message: 'Ending date is required'
    }]

  };


  constructor(
    private http: HttpClient,
    private prof: ProfileService,
    private authservice: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,

  ) {}

  ngOnInit() {
    this.createForms();
    this.showCreateProfile();
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
      refereeComp: new FormControl('', Validators.required),
      refereeAddress: new FormControl('', Validators.required),
      refereeEmail: new FormControl('', Validators.compose([
        Validators.pattern(this.emailPattern)
      ])),
      refereePhonenumber: new FormControl('', Validators.compose([
        Validators.pattern(this.keRegexPattern),
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
      refereeComp1: new FormControl(''),
      refereeEmail1: new FormControl('', Validators.compose([
        Validators.pattern(this.emailPattern)
      ])),
      refereePhonenumber1: new FormControl('', Validators.compose([
        Validators.pattern(this.keRegexPattern),
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
      refereeComp2: new FormControl(''),
      refereeEmail2: new FormControl('', Validators.compose([
        Validators.pattern(this.emailPattern)
      ])),
      refereePhonenumber2: new FormControl('', Validators.compose([
        Validators.pattern(this.keRegexPattern),
        Validators.maxLength(12),
        Validators.minLength(10),
      ])),
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
      IDnumber: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]+$'),
        Validators.maxLength(8),
        Validators.minLength(7),
      ])),
      phonenumber: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(this.keRegexPattern),
        Validators.maxLength(12),
        Validators.minLength(10),
      ])),
      dateofbirth: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      workexperience: this.workExperienceForm,
      academicQualification: this.academicQualificationForm,
      pqualification: new FormControl(''),
      profession: new FormControl('', Validators.required),
      skills: new FormControl(''),
      membership: new FormControl(''),
      referees: this.refereeForm,
    });
  }

  onSubmitAccountDetails(value) {
    this.isLoading = true;
    value.workexperience = JSON.stringify(JSON.stringify(value.workexperience));
    value.academicQualification = JSON.stringify(JSON.stringify(value.academicQualification));
    value.referees = JSON.stringify(JSON.stringify(value.referees));
    console.log(value);
    this.prof.updateProfile(value).subscribe(
      res => {
        console.log(value);
        this.showSuccess(value.firstname);
        this.router.navigate(['profile']);
      }, err => {
        this.showFailure();
      }
    );

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
  showSuccess(firstname) {
    this.toastr.success(firstname + '\'s' + 'profile has been created successfully', 'Create Successful!', {
      progressAnimation: 'increasing',
      timeOut: 4000,
      tapToDismiss: true,
      easing: 'ease-in'
    });
    this.isLoading = false;
  }
  showFailure() {
    this.toastr.error('profile has been not updated', 'Update Unsuccessful!', {
      progressAnimation: 'increasing',
      timeOut: 4000,
      tapToDismiss: true,
      easing: 'ease-in'
    });
    this.isLoading = false;
  }
  showCreateProfile() {
    this.toastr.info('Create Your Profile to proceed', 'Profile', {
      progressAnimation: 'increasing',
      timeOut: 4000,
      tapToDismiss: true,
      easing: 'ease-in'
    });
    this.isLoading = false;
  }
}
