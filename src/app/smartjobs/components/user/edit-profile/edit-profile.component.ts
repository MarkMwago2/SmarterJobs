import { Component, OnInit, Input, forwardRef, NgZone } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { AuthService } from '../../../services/auth.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';

import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup, Validator, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditProfileComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => EditProfileComponent),
      multi: true
    }
  ]
})
export class EditProfileComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private prof: ProfileService,
    private authservice: AuthService,
    private router: Router
  ) { }
  data: any[] = [];
  imageId;
  publicId;
  imageUrl;

  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({
      cloudName: environment.cloudName,
      uploadPreset: environment.uploadPreset
    })
  );

  loading: any;

  public uploadImageForm: FormGroup = new FormGroup(
    {
      public_id: new FormControl(this.publicId, [Validators.required]),
    }
  );


  profile: any = {
    telephone: '',
    name: '',
    role: '',
    county: '',
    dependence: '',
    next_of_kin: '',
    cumulative_experience: '',
    national_id: '',
    Availability_status: '',
    academic_qualifications: '',
    professional_qualification: '',
    skills: ''
  };
  upload() {
    this.loading = true;
    this.uploader.uploadAll();
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      const res: any = JSON.parse(response);
      this.loading = false;
      this.imageId = res.public_id;
      const timeTaken = new Date().getTime();
      this.publicId = this.imageId;
      this.imageUrl = res.url;
      console.log(this.imageUrl);

    };
    this.uploader.onErrorItem = (fileItem, response, status, headers) => {
      console.info('onErrorItem', fileItem, response, status, headers);
    };
  }

  public onTouched: () => void = () => {};

    writeValue(val: any): void {
      val && this.uploadImageForm.setValue(val, {
        emitEvent: false
      });
    }

    registerOnChange(fn: any): void {
      console.log('on change');
      this.uploadImageForm.valueChanges.subscribe(fn);
    }

    registerOnTouched(fn: any): void {
      console.log('on blur');
      this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
      isDisabled ? this.uploadImageForm.disable() : this.uploadImageForm.enable();
    }

    validate(c: AbstractControl): ValidationErrors | null {
      console.log('UploadImage form Validation', c);
      return this.uploadImageForm.valid ? null : {
        invalidForm: { valid: false, message: 'uploadImageForm field is invalid'}
      };
    }

  ngOnInit() {
  }

  onSubmit() {
    this.prof.updateProfile(this.profile).subscribe(
      res => {
        console.log('update successful');
        this.router.navigate(['profile']);
      }, err => {
        console.log('update unsuccessful');
      }
    );
  }

}
