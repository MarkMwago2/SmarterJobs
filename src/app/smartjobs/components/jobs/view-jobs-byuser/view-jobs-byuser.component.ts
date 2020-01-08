import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import {
  JobsService
} from '../../../services/jobs.service';
import {
  ProfileService
} from '../../../services/profile.service';
import {
  Router, ActivatedRoute
} from '@angular/router';
import { Location } from '@angular/common';
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
  selector: 'app-view-jobs-byuser',
  templateUrl: './view-jobs-byuser.component.html',
  styleUrls: ['./view-jobs-byuser.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ViewJobsByuserComponent implements OnInit {
  error: any;
  isLoading: boolean;
  companyId: any;
  userId: any;
  jobId: any;
  jobsList = [];
  constructor(
    private router: Router,
    private prof: ProfileService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private jobs: JobsService,
    private actRoute: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() {
    // this.jobId = this.actRoute.snapshot.paramMap.get('id');
    this.getJobs();
  }

  getJobs() {
    this.jobs.getAllJobs().subscribe(
      res => {
        this.jobsList = res;
        console.log(this.jobsList);
      },
      error => {
        console.error(error);
      }
    );
  }

}
