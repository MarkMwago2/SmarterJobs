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

  showTab = 1;
  showRef = 1;
  showAca = 1;
  showWex = 1;

  isLoading: boolean;
  profile = [];

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
    },
    {
      type: 'minlength',
      message: 'phone number cannot be less than 10 digits long'
    },
    {
      type: 'maxlength',
      message: 'phone number cannot be more than 12 digits long'
    },
    {
      type: 'pattern',
      message: 'Enter a valid phone number starting with +254 or 07'
    }
    ],
    address: [{
      type: 'required',
      message: 'Address is required'
    }],
    wCompanyname: [{
      type: 'required',
      message: 'Company Name is required'
    },
    {
      type: 'minlength',
      message: 'Company must be at least 3 characters long'
    },
    {
      type: 'maxlength',
      message: 'Company cannot be more than 25 characters long'
    },
    {
      type: 'pattern',
      message: 'Your Company must contain only letters'
    },
    {
      type: 'validCompany',
      message: 'Your Company has already been taken'
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

  keRegexPattern = /^(?:254|\+254|0)?(7(?:(?:[129][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$/;
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


  constructor(
    private http: HttpClient,
    private prof: ProfileService,
    private authservice: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.prof.userprofile().subscribe(
      success => {
        success.workexperience = JSON.parse(JSON.parse(success.workexperience));
        success.academicQualification = JSON.parse(JSON.parse(success.academicQualification));
        success.referees = JSON.parse(JSON.parse(success.referees));
        console.log(success);
        this.profile.push(success);
        this.createForms();
        // success.workexperience = JSON.stringify(JSON.stringify(success.workexperience));
        // console.log(success.workexperience);
        // console.log(JSON.parse(success.workexperience))
    },
    error => {
      console.log(error);
    }
    );
  }
  createForms() {
    this.workExperienceForm = new FormGroup({
      wCompanyname: new FormControl(this.profile[0].workexperience.wCompanyname, Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$')
      ])),
      Pstartdate: new FormControl(this.profile[0].workexperience.Pstartdate, ),
      Penddate: new FormControl(this.profile[0].workexperience.Penddate, ),
      duties: new FormControl(this.profile[0].workexperience.duties, ),
      wCompanyname1: new FormControl(this.profile[0].workexperience.wCompanyname1, Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$')
      ])),
      Pstartdate1: new FormControl(this.profile[0].workexperience.Pstartdate1),
      Penddate1: new FormControl(this.profile[0].workexperience.Penddate1),
      duties1: new FormControl(this.profile[0].workexperience.duties1),
      wCompanyname2: new FormControl(this.profile[0].workexperience.wCompanyname2, Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$')
      ])),
      Pstartdate2: new FormControl(this.profile[0].workexperience.Pstartdate2),
      Penddate2: new FormControl(this.profile[0].workexperience.Penddate2),
      duties2: new FormControl(this.profile[0].workexperience.duties2),
    });
    this.academicQualificationForm = new FormGroup({
      institutionname: new FormControl(this.profile[0].academicQualification.institutionname, Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$')
      ])),
      Astartdate: new FormControl(this.profile[0].academicQualification.Astartdate, ),
      Aenddate: new FormControl(this.profile[0].academicQualification.Aenddate, ),
      merit: new FormControl(this.profile[0].academicQualification.merit, ),
      institutionname1: new FormControl(this.profile[0].academicQualification.institutionname1, Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$'),
      ])),
      Astartdate1: new FormControl(this.profile[0].academicQualification.Astartdate1),
      Aenddate1: new FormControl(this.profile[0].academicQualification.Aenddate1),
      merit1: new FormControl(this.profile[0].academicQualification.merit1),
      institutionname2: new FormControl(this.profile[0].academicQualification.institutionname2, Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$'),
      ])),
      Astartdate2: new FormControl(this.profile[0].academicQualification.Astartdate2),
      Aenddate2: new FormControl(this.profile[0].academicQualification.Aenddate2),
      merit2: new FormControl(this.profile[0].academicQualification.merit2),
    });
    this.refereeForm = new FormGroup({
      refereetitle: new FormControl(this.profile[0].referees.refereetitle, Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$')
      ])),
      refereefname: new FormControl(this.profile[0].referees.refereefname, Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$')
      ])),
      refereelname: new FormControl(this.profile[0].referees.refereelname, Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$')
      ])),
      refereeComp: new FormControl(this.profile[0].referees.refereeComp, ),
      refereeAddress: new FormControl(this.profile[0].referees.refereeAddress, ),
      refereeEmail: new FormControl(this.profile[0].referees.refereeEmail, Validators.compose([
        Validators.pattern(this.emailPattern)
      ])),
      refereePhonenumber: new FormControl(this.profile[0].referees.refereePhonenumber, Validators.compose([
        Validators.pattern(this.keRegexPattern),
        Validators.maxLength(12),
        Validators.minLength(10),
      ])),
      refereetitle1: new FormControl(this.profile[0].referees.refereetitle1, Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$'),
      ])),
      refereefname1: new FormControl(this.profile[0].referees.refereefname1, Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$'),
      ])),
      refereelname1: new FormControl(this.profile[0].referees.refereelname1, Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$'),
      ])),
      refereeAddress1: new FormControl(this.profile[0].referees.refereeAddress1),
      refereeComp1: new FormControl(this.profile[0].referees.refereeComp1),
      refereeEmail1: new FormControl(this.profile[0].referees.refereeEmail1, Validators.compose([
        Validators.pattern(this.emailPattern)
      ])),
      refereePhonenumber1: new FormControl(this.profile[0].referees.refereePhonenumber1, Validators.compose([
        Validators.pattern(this.keRegexPattern),
        Validators.maxLength(12),
        Validators.minLength(10),
      ])),
      refereetitle2: new FormControl(this.profile[0].referees.refereetitle2, Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$')
      ])),
      refereefname2: new FormControl(this.profile[0].referees.refereefname2, Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$')
      ])),
      refereelname2: new FormControl(this.profile[0].referees.refereelname2, Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$')
      ])),
      refereeAddress2: new FormControl(this.profile[0].referees.refereeAddress2),
      refereeComp2: new FormControl(this.profile[0].referees.refereeComp2),
      refereeEmail2: new FormControl(this.profile[0].referees.refereeEmail2, Validators.compose([
        Validators.pattern(this.emailPattern)
      ])),
      refereePhonenumber2: new FormControl(this.profile[0].referees.refereePhonenumber2, Validators.compose([
        Validators.pattern(this.keRegexPattern),
        Validators.maxLength(12),
        Validators.minLength(10),
      ])),
    });
    this.accountDetailsForm = this.fb.group({
      firstname: new FormControl(this.profile[0].firstname, Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$')
      ])),
      lastname: new FormControl(this.profile[0].lastname, Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z ]+$')
      ])),
      IDnumber: new FormControl(this.profile[0].IDnumber, Validators.compose([
        ,
        Validators.pattern('^[0-9]+$'),
        Validators.maxLength(8),
        Validators.minLength(7),
      ])),
      phonenumber: new FormControl(this.profile[0].phonenumber, Validators.compose([
        ,
        Validators.pattern(this.keRegexPattern),
        Validators.maxLength(12),
        Validators.minLength(10),
      ])),
      dateofbirth: new FormControl(this.profile[0].dateofbirth, ),
      address: new FormControl(this.profile[0].address, ),
      gender: new FormControl(this.profile[0].gender, ),
      workexperience: this.workExperienceForm,
      academicQualification: this.academicQualificationForm,
      pqualification: new FormControl(this.profile[0].pqualification),
      profession: new FormControl('', Validators.required),
      skills: new FormControl(this.profile[0].skills),
      membership: new FormControl(this.profile[0].membership),
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
    this.toastr.success(firstname + '\'s' + 'profile has been updated successfully', 'Update Successful!', {
      progressAnimation: 'increasing',
      timeOut: 2000,
      tapToDismiss: true,
      easing: 'ease-in'
    });
    this.isLoading = false;
  }
  showFailure() {
    this.toastr.error('profile has been not updated', 'Update Unsuccessful!', {
      progressAnimation: 'increasing',
      timeOut: 2000,
      tapToDismiss: true,
      easing: 'ease-in'
    });
    this.isLoading = false;
  }
}
