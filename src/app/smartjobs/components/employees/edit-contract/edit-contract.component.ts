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
export interface ActiveOptions {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-contract',
  templateUrl: './edit-contract.component.html',
  styleUrls: ['./edit-contract.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditContractComponent implements OnInit {

  @ViewChild('resetAddContractForm', {static: false}) myNgForm;
  error: any;
  isLoading: boolean;
  AddContractForm: FormGroup;
  companyId: any;
  userId: any;
  contract: any;

  exlvs: ActiveOptions[] = [
    {value: 'true', viewValue: 'Active'},
    {value: 'false', viewValue: 'Inactive'},
  ];

  addContractMessages = {
    contractType: [{
        type: 'required',
        message: 'Job title is required'
      },
      {
        type: 'pattern',
        message: 'Job title must contain only letters'
      },
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
    this.getContract();
  }
  createForms() {
    // user links form validations
    this.AddContractForm = this.fb.group({
      contractType: new FormControl(this.contract.contractType, Validators.compose([
        Validators.pattern('^[a-zA-Z ]+$'),
        Validators.required
      ])),
      startdate: new FormControl(this.contract.startdate, Validators.required),
      enddate: new FormControl(this.contract.enddate, Validators.required),
      active: new FormControl(this.contract.active)
    });
  }

  getContract() {
    const contractId = JSON.parse(this.actRoute.snapshot.paramMap.get('id'));
    this.jobs.getContractByID(contractId).subscribe( res => {
      this.contract = res;
      this.createForms();
    },
    error => {
      console.error(error);
    });
  }
  onSubmitAddContract(value) {
    this.isLoading = true;
    const contractId = JSON.parse(this.actRoute.snapshot.paramMap.get('id'));
    this.jobs.editContractByID(contractId, value).subscribe(res => {
      this.showSuccess();
      this.router.navigate(['view-contracts']);
    },
    error => {
      this.showFailure();
    }
    );
  }
  showSuccess() {
    this.toastr.success('Contract has been edited' , 'Edit Successful!', {
      progressAnimation: 'increasing',
      timeOut: 5000,
      tapToDismiss: true,
      easing: 'ease-in'
    });
    this.isLoading = false;
  }

  showCreate() {
    this.toastr.info('Fill in the form below with details about the contract', 'Edit contract', {
      progressAnimation: 'increasing',
      timeOut: 5000,
      tapToDismiss: true,
      easing: 'ease-in'
    });
    this.isLoading = false;
  }

  showFailure() {
    this.toastr.error('Contract has not been edoted' + 'Check the details and try again', 'Edit Unsuccessful!', {
      progressAnimation: 'increasing',
      timeOut: 4000,
      tapToDismiss: true,
      easing: 'ease-in'
    });
    this.isLoading = false;
  }
  resetForm() {
    this.AddContractForm.reset();
    Object.keys(this.AddContractForm.controls).forEach(key => {
      this.AddContractForm.controls[key].setErrors(null);
    });
  }
}
