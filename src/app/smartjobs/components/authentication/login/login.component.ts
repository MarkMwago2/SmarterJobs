import {
  Component,
  OnInit, ViewEncapsulation
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
  ProfileService
} from '../../../services/profile.service';
import {
  ToastrService
} from 'ngx-toastr';
import {
  ParentErrorStateMatcher
} from '../../../../shared/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  error: any;
  profile: any = {};
  profileComplete = 0;
  user: any = {};
  company: any;
  email: string;
  password: string;
  isLoading: boolean;

  accountDetailsForm: FormGroup;

  parentErrorStateMatcher = new ParentErrorStateMatcher();


  account_validation_messages = {
    'email': [{
      type: 'required',
      message: 'Email is required'
    },
    {
      type: 'pattern',
      message: 'Enter a valid email'
    }
  ],
  };
  constructor(
    private authService: AuthService,
    private router: Router,
    private prof: ProfileService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.createForms();
  }

  createForms() {
    // user links form validations
    this.accountDetailsForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });
  }

  onSubmitAccountDetails(value) {
    this.isLoading = true;
    this.email = value['email'];
    this.password = value['password'];
    this.authService.login(this.email, this.password).subscribe(
      success => {
        this.prof.userprofile().subscribe(profile => {
          profile = profile;
          this.prof.user().subscribe(user => {
            user = user;
            this.showSuccess(user['username']);
            const delayInMilliseconds = 2000;

            setTimeout(() => {
              if (user.groups[0] === 1) {
                const total = Object.keys(profile).length;
                let completeEntries = 0;
                for (const key in profile) {
                  if (profile[key] !== '' && profile[key] !== null && profile[key] !== undefined) {
                    completeEntries++;
                    this.profileComplete = Math.round(100 * completeEntries / total);
                    if (this.profileComplete >= 35) {
                      this.router.navigate(['view-jobs']);
                    } else {
                      this.router.navigate(['create-profile']);
                    }
                    // console.log(this.profileComplete);
                  }
                }
              } else {
                this.router.navigate(['dashboard']);
              }
            }, delayInMilliseconds);
          });
        });
      },
      error => {
        this.isLoading = false;
        this.showFailure();
        this.error = error;
      }
    );
  }
  showSuccess(username) {
    this.toastr.success('Welcome ' + username, 'Login Successful!', {
      progressAnimation: 'increasing',
      timeOut: 2000,
      tapToDismiss: true,
      easing: 'ease-in'
    });
    this.isLoading = false;
  }

  showFailure() {
    this.toastr.error('Login Failed' + 'Check the details and try again', 'Login Unsuccessful!', {
      progressAnimation: 'increasing',
      timeOut: 4000,
      tapToDismiss: true,
      easing: 'ease-in'
    });
    this.isLoading = false;
  }

}
