import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';

import {
  ProfileService
} from '../../../services/profile.service';
import {
  JobsService
} from '../../../services/jobs.service';
import {
  Router, ActivatedRoute
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
export interface Contracttype {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddContractComponent implements OnInit {

  @ViewChild('resetAddEmployeeForm', {static: false}) myNgForm;
  error: any;
  isLoading: boolean;
  AddContractForm: FormGroup;
  companyId: any;
  userId: any;

  addContractMessages = {
    contractType: [{
        type: 'required',
        message: 'Job title is required'
      },
    ],
  };
  contracts: Contracttype[] = [
    {value: 'Fixed Term', viewValue: 'Fixed Term'},
    {value: 'Internship', viewValue: 'Internship'},
    {value: 'Casual', viewValue: 'Casual'},
    {value: 'Permanent & Pensionable', viewValue: 'Permanent & Pensionable'},
  ];

  constructor(
    private router: Router,
    private prof: ProfileService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private jobs: JobsService,
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.createForms();
    this.showCreate();
  }
  createForms() {
    // user links form validations
    this.AddContractForm = this.fb.group({
      contractType: new FormControl('', Validators.compose([
        Validators.required
      ])),
      startdate: new FormControl('', Validators.required),
      enddate: new FormControl('', Validators.required),
    });
  }

  onSubmitAddContract(value) {
    value.userId = JSON.parse(this.actRoute.snapshot.paramMap.get('id'));
    this.userId = this.prof.loggedInUserId();
    this.prof.getcompanyprofileByUserId(this.userId).subscribe(res => {
      this.companyId = res.id;
    },
    error => {
      console.error(error);
    });
    this.isLoading = true;
    console.log(value);
    value.company = this.companyId;
    this.jobs.createContract(value).subscribe(
      res => {
        console.log(value);
        this.showSuccess();
        // this.router.navigate(['agency-jobs']);
      }, err => {
        this.showFailure();
      }
    );
  }

  showSuccess() {
    this.toastr.success('Contract has been created' , 'Add Successful!', {
      progressAnimation: 'increasing',
      timeOut: 5000,
      tapToDismiss: true,
      easing: 'ease-in'
    });
    this.isLoading = false;
  }

  showCreate() {
    this.toastr.info('Fill in the form below with details about the contract', 'Add contract', {
      progressAnimation: 'increasing',
      timeOut: 5000,
      tapToDismiss: true,
      easing: 'ease-in'
    });
    this.isLoading = false;
  }

  showFailure() {
    this.toastr.error('Contract has not been created' + 'Check the details and try again', 'Add Unsuccessful!', {
      progressAnimation: 'increasing',
      timeOut: 4000,
      tapToDismiss: true,
      easing: 'ease-in'
    });
    this.isLoading = false;
  }
   /* Reset form */
   resetForm() {
    this.AddContractForm.reset();
    Object.keys(this.AddContractForm.controls).forEach(key => {
      this.AddContractForm.controls[key].setErrors(null);
    });
  }

}
