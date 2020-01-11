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


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddEmployeeComponent implements OnInit {

  @ViewChild('resetAddContractForm', {static: false}) myNgForm;
  error: any;
  isLoading: boolean;
  AddEmployeeForm: FormGroup;
  companyId: any;
  userId: any;
  contractId: any;

  addEmployeeMessages = {
    staff_id_number: [{
        type: 'required',
        message: 'Staff Number is required'
      }
    ],
    kra_pin: [{
      type: 'required',
      message: 'Staff Number is required'
      }
    ],
    next_of_kin: [{
      type: 'required',
      message: 'Next of Kin is required'
      }
    ],
    dependants: [{
      type: 'required',
      message: 'Dependants is required'
      }
    ],
    next_of_kinAddress: [{
      type: 'required',
      message: 'Next Of Kin\'s Address is required'
      }
    ],
    next_of_kinPhoneNumber: [{
      type: 'required',
      message: 'Next Of Kin\'s Phone Number is required'
      }
    ],
  };
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
    this.AddEmployeeForm = this.fb.group({
      staff_id_number: new FormControl('', Validators.compose([
        Validators.required
      ])),
      kra_pin: new FormControl('', Validators.required),
      next_of_kin: new FormControl('', Validators.required),
      dependants: new FormControl('', Validators.required),
      next_of_kinAddress: new FormControl('', Validators.required),
      next_of_kinPhoneNumber: new FormControl('', Validators.required)
    });
  }
  onSubmitAddEmployee(value) {
    value.contract = JSON.parse(this.actRoute.snapshot.paramMap.get('id'));
    this.contractId = JSON.parse(this.actRoute.snapshot.paramMap.get('id'));
    this.userId = this.prof.loggedInUserId();
    this.prof.getcompanyprofileByUserId(this.userId).subscribe(res => {
      this.companyId = res.id;
      value.company = this.companyId;
    },
    error => {
      console.error(error);
    });
    this.jobs.getContractByID(this.contractId).subscribe(
      success => {
        value.user = success.userId;
      }
    )
    this.isLoading = true;
    console.log(value);
    value.company = this.companyId;
    this.jobs.createEmployee(value).subscribe(
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
    this.toastr.success('Employee has been added' , 'Add Successful!', {
      progressAnimation: 'increasing',
      timeOut: 5000,
      tapToDismiss: true,
      easing: 'ease-in'
    });
    this.isLoading = false;
  }

  showCreate() {
    this.toastr.info('Fill in the form below with details about the employee', 'Add employee', {
      progressAnimation: 'increasing',
      timeOut: 5000,
      tapToDismiss: true,
      easing: 'ease-in'
    });
    this.isLoading = false;
  }

  showFailure() {
    this.toastr.error('Employee has not been added' + 'Check the details and try again', 'Add Unsuccessful!', {
      progressAnimation: 'increasing',
      timeOut: 4000,
      tapToDismiss: true,
      easing: 'ease-in'
    });
    this.isLoading = false;
  }
   /* Reset form */
   resetForm() {
    this.AddEmployeeForm.reset();
    Object.keys(this.AddEmployeeForm.controls).forEach(key => {
      this.AddEmployeeForm.controls[key].setErrors(null);
    });
  }

}
