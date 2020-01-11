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
export interface Rating {
  value: number;
  viewValue: number;
}
export interface Blacklisted {
  value: any;
  viewValue: any;
}
@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditEmployeeComponent implements OnInit {
  @ViewChild('resetAddContractForm', {static: false}) myNgForm;
  error: any;
  isLoading: boolean;
  AddEmployeeForm: FormGroup;
  companyId: any;
  userId: any;
  employeeId: any;
  employee: any;

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
  }
  ratings: Rating[] = [
    {value: 0, viewValue: 0},
    {value: 1, viewValue: 1},
    {value: 2, viewValue: 2},
    {value: 3, viewValue: 3},
    {value: 4, viewValue: 4},
    {value: 5, viewValue: 5},
  ];
  blacklisteds: Blacklisted[] = [
    {value: true, viewValue: true},
    {value: false, viewValue: false}
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
    this.getEmployee();
  }

  createForms() {
    // user links form validations
    this.AddEmployeeForm = this.fb.group({
      staff_id_number: new FormControl(this.employee.staff_id_number, Validators.compose([
        Validators.required
      ])),
      kra_pin: new FormControl(this.employee.kra_pin, Validators.required),
      next_of_kin: new FormControl(this.employee.next_of_kin, Validators.required),
      dependants: new FormControl(this.employee.dependants, Validators.required),
      next_of_kinAddress: new FormControl(this.employee.next_of_kinAddress, Validators.required),
      next_of_kinPhoneNumber: new FormControl(this.employee.next_of_kinPhoneNumber, Validators.required),
      rating: new FormControl(this.employee.rating),
      ratingComment: new FormControl(this.employee.ratingComment),
      blacklisted: new FormControl(this.employee.blacklisted),
      blacklistedComment: new FormControl(this.employee.blacklistedComment)
    });
  }
  getEmployee() {
    const employeeId = JSON.parse(this.actRoute.snapshot.paramMap.get('id'));
    this.jobs.getEmployeeByID(employeeId).subscribe(
      res => {
        this.employee = res;
        this.createForms();
      }
    )
  }
  onSubmitAddEmployee(value) {
    this.isLoading = true;
    const employeeId = JSON.parse(this.actRoute.snapshot.paramMap.get('id'));
    const profValue = {
      rating: value.rating,
      ratingComment: value.ratingComment,
      blacklisted: value.blacklisted,
      blacklistedComment: value.blacklistedComment
    };
    this.prof.updateProfileByUserId(employeeId, profValue).subscribe( res =>{
      delete value.rating;
      delete value.ratingComment;
      delete value.blacklisted;
      delete value.blacklistedComment;
    },
    error => {
      console.log(error);
    });
    this.jobs.editEmployeeByID(employeeId, value).subscribe(res => {
      this.showSuccess();
    },
    error => {
      this.showFailure();
    })
  }
  showSuccess() {
    this.toastr.success('Employee has been updated' , 'Update Successful!', {
      progressAnimation: 'increasing',
      timeOut: 5000,
      tapToDismiss: true,
      easing: 'ease-in'
    });
    this.isLoading = false;
  }

  showCreate() {
    this.toastr.info('Edit the form below with details about the employee', 'Edit employee', {
      progressAnimation: 'increasing',
      timeOut: 5000,
      tapToDismiss: true,
      easing: 'ease-in'
    });
    this.isLoading = false;
  }

  showFailure() {
    this.toastr.error('Employee has not been edited' + 'Check the details and try again', 'Edit Unsuccessful!', {
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
