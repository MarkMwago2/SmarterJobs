import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import {
  Router
} from '@angular/router';
import {
  AuthService
} from '../../../services/auth.service';
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


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegistrationComponent implements OnInit {

  accountDetailsForm: FormGroup;
  matching_passwords_group: FormGroup;
  country_phone_group: FormGroup;

  parentErrorStateMatcher = new ParentErrorStateMatcher();

  account_validation_messages = {
    'username': [{
        type: 'required',
        message: 'Username is required'
      },
      {
        type: 'minlength',
        message: 'Username must be at least 5 characters long'
      },
      {
        type: 'maxlength',
        message: 'Username cannot be more than 25 characters long'
      },
      {
        type: 'pattern',
        message: 'Your username must contain only letters'
      },
      {
        type: 'validUsername',
        message: 'Your username has already been taken'
      }
    ],
    'email': [{
        type: 'required',
        message: 'Email is required'
      },
      {
        type: 'pattern',
        message: 'Enter a valid email'
      }
    ],
    'confirm_password': [{
        type: 'required',
        message: 'Confirm password is required'
      },
      {
        type: 'areEqual',
        message: 'Password mismatch'
      }
    ],
    'password': [{
        type: 'required',
        message: 'Password is required'
      },
      {
        type: 'minlength',
        message: 'Password must be at least 5 characters long'
      },
      {
        type: 'pattern',
        message: 'Your password must contain at least one uppercase, one lowercase, and one number'
      }
    ],
    'terms': [{
      type: 'pattern',
      message: 'You must accept terms and conditions'
    }]
  };

  username: string;
  email: string;
  password: string;
  error: any;
  isLoading: boolean;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.createForms();
  }

  createForms() {
    // matching passwords validation
    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    // user links form validations
    this.accountDetailsForm = this.fb.group({
      username: new FormControl('', Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^[a-zA-Z]+$'),
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      matching_passwords: this.matching_passwords_group,
      terms: new FormControl(false, Validators.pattern('true'))
    });

  }

  onSubmitAccountDetails(value) {
    this.isLoading = true;
    this.username = value['username'];
    this.email = value['email'];
    this.password = value['matching_passwords']['password'];
    this.authService.signup(this.username, this.email, this.password).subscribe(
      success => {
        this.showSuccess(value['username']);
        const delayInMilliseconds = 2000;

        setTimeout(() => {
          this.router.navigate(['sign-in']);
        }, delayInMilliseconds);
      },
      error => this.error = error
    );
  }
  showSuccess(username) {
    this.toastr.success('Account for ' + username + ' created', 'Registration Successful!', {
      progressAnimation: 'increasing',
      timeOut: 2000,
      tapToDismiss: true,
      easing: 'ease-in'
    });
    this.isLoading = false;
  }

}
